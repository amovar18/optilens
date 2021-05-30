const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

app.use(cors());
app.use(bodyParser.json());
exports.create=function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err)
                return res.status(500).send(err);
            bcrypt.hash(req.body.password, salt, function(err, hash) { 
                if(err)
                    return res.status(500).send(err);
                const tobeinserted={
                    'username':req.body.username,
                    'password':hash,
                    'email':req.body.email,
                    'phone':req.body.phone,
                    'name':req.body.name,
                    'isactive':1,
                    'address':req.body.address,
                    'cart':[],};
                (async ()=>{
                    const customer = await db.collection('customer').insertOne(tobeinserted);
                    if(customer['acknowledged']){
                        let token = jwt.sign({_id: customer['insertedId'],type:'customer'}, key,{expiresIn: '72h'});
                        return res.cookie('token', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true}).send('OK');
                    }
                })();
            });
        });
    });
};
exports.available=function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        (async ()=>{
            const user = await db.collection('customer').find({ "username": req.params.username }, { $exists: true }).toArray();
            if(user.length > 0){
                return res.status(200).send(false);
            }else{
                return res.status(200).send(true);
            }
        })();
    });
}
exports.isallowedgeneral=function (req, res) {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, key, (err, decoded) => {
            if (err) 
                return res.status(500).send('Internal Server error');
            if(decoded.type==='customer'){   
                return res.status(200).send(true);
            }else{
                return res.status(200).send(false);
            }
        });
    }else{
        return res.status(200).send(true);
    }
};

exports.isallowed=function (req, res) {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, key, (err, decoded) => {
            if (err) 
                return res.status(500).send('Internal Server error');
            if(decoded.type==='customer'){
                return res.status(200).send(true);
            }else{
                return res.status(200).send(false);
            }
        });
    }else{
        return res.status(401).send(false);
    }
};