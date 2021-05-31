const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const multer=require('multer');
const jwt=require('jsonwebtoken');
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
const firebase = require("firebase/app");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
require('firebase/storage');
global.XMLHttpRequest=require('xhr2');
const upload = multer({storage:multer.memoryStorage()}).single('image');
const storageRef = firebase.storage().ref();
const saltRounds = 10;

app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());
exports.create=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        var db = client.db('opticonnect');
        upload(req,res,function(err){
            if (err instanceof multer.MulterError) {
                return res.send(err);
             } else if (err) {
                return res.send(err);
             }else{
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
                            'isactive':0,
                            'company_registration_certificate':'',
                            'address':req.body.address,
                            'shopname':req.body.shopname,};
                        (async ()=>{
                            const seller = await db.collection('seller').insertOne(tobeinserted);
                            if(seller['acknowledged']){
                                upload(req,res,function(err){
                                    if (err instanceof multer.MulterError) {
                                        return res.send(err);
                                    } else if (err) {
                                        return res.send(err);
                                    }else{
                                        const uploadTask = storageRef.child('certificates/'+seller['insertedId']+'/documents/_'+Date.now()).put(file.buffer);
                                        uploadTask.on('state_changed', (snapshot) => {
                                            
                                        }, (error) => {
                                            console.log(error);
                                        }, () => {
                                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                                console.log('done');
                                                db.collection('seller').updateOne({'_id':ObjectId(seller['insertedId'])},{$set:{'company_registration_certificate':downloadURL}},(err, object)=> {
                                                    return res.status(200).send('done');
                                                });
                                            });
                                        });
                                    };
                                });
                            }else{
                                return res.status(500).send(err);
                            }
                        })();
                    });
                });
            }
        });
    });
};
exports.available=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        (async()=>{
            const seller = await db.collection('seller').find({ "username": req.params.username }, { $exists: true }).toArray();
            if(seller.length){
                return res.status(200).send(false);
            }else{
                return res.status(200).send(true);
            }   
        })();
    });
}
exports.isallowed=function (req, res) {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, key, (err, decoded) => {
            if (err) 
                return res.status(500).send('Internal Server error');
            if(decoded.type==='seller'){
                return res.status(200).send(true);
            }else{
                return res.status(200).send(false);
            }
        });
    }else{
        return res.status(401).send(false);
    }
};