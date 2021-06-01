const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
// get config consts
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';


// access config const
app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());
exports.authenticate=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        const username=req.body.username;
        const password=req.body.password;
        if(req.body.typeofuser === "customer"){
            (async ()=>{
                const user =await  db.collection('customer').find({'username':username}).toArray();
                if(user[0]){
                    bcrypt.compare(password,user[0]['password'],(err,hash_result)=>{
                        if(err)
                            return res.status(401).send(err);           
                        if(hash_result===false){
                            return res.status(401).send('Wrong password');
                        }
                        if( user.length > 0){
                            console.log(hash_result)
                            const payload = {'_id': user[0]['_id'],type:'customer'}
                            let token = jwt.sign(payload, key,{expiresIn: '72h'});
                            return res.cookie('token', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true}).send({
                                'user':user,
                                'links':[{title:'Home', path:'/'},{ title: `Product`, path: `/product/all/1` },{ title: `FAQ`, path: `/faq` },{ title: `About us`, path: `/about` },{ title: `Cart`, path: `/cart` },{ title: `Your Orders`, path: `/yorders` },{ title: `Logout`, path: `/logout` }]
                            });
                        }else{
                            return res.status(404).send('not found');
                        }
                    })    
                }else{
                    return res.status(401).send('wrong password');
                }
            })();
        }
        if(req.body.typeofuser === "seller"){
            (async()=>{
                const user=await db.collection('seller').find({'username':username}).toArray();
                bcrypt.compare(password,user[0]['password'],(err,hash_result)=>{
                    if(err)
                        return res.status(401).send(err);           
                
                    if(user.length > 0){
                        let token = jwt.sign({_id: user[0]['_id'],type:'seller'}, key,{expiresIn: '72h'});
                        return res.cookie('token', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true}).send({   
                            'user':user,
                            'links':[{title:'Home', path:'/'},{ title: `About us`, path: `/about` },{ title: `Insert Products`, path: `/insertproduct` },{ title: `All Orders`, path: `/recievedorders` },{ title: `Pending Orders`, path: `/pendingorders` },{ title: `FAQ`, path: `/faq` },{ title: `Logout`, path: `/logout` }]                        
                        });
                    }else{
                        return res.status(404).send('not found');
                    }
                })
            })();
        }
        
    });
};
exports.links=function (req, res) {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, key, (err, decoded) => {
        if (err) return res.sendStatus(403);
            if(decoded.type==='customer'){
                return res.status(200).send([{title:'Home', path:'/'},{ title: `Product`, path: `/product/all/1` },{ title: `FAQ`, path: `/faq` },{ title: `About us`, path: `/about` },{ title: `Cart`, path: `/cart` },{ title: `Your Orders`, path: `/yorders` },{ title: `Logout`, path: `/logout` }]);
            }else if(decoded.type==='seller'){
                return res.status(200).send([{title:'Home', path:'/'},{ title: `About us`, path: `/about` },{ title: `Insert Products`, path: `/insertproduct` },{ title: `All Orders`, path: `/recievedorders` },{ title: `Pending Orders`, path: `/pendingorders` },{ title: `FAQ`, path: `/faq` },{ title: `Logout`, path: `/logout` }]);
            }
        });
    }else{
        return res.status(200).send([{title:'Home', path:'/'},{ title: `About us`, path: `/about` },{ title: `Product`, path: `/product/all` },{ title: `FAQ`, path: `/faq` },{ title: `Login`, path: `/login` }]);
    }
    
};

exports.checkstatus=function (req, res) {
    const token = req.cookies.token;
    MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        if(token===null || token === undefined) return res.status(401).send('not authed');
        jwt.verify(token, key, (error,result)=>{
            if(result['type'] === "customer"){
                (async ()=>{
                    const user =await  db.collection('customer').find({'_id':ObjectId(result['_id'])}).toArray();
                    if(user[0]['_id'].toString() === result['_id'].toString()){
                        return res.status(200).send('OK');
                    }else{
                        res.clearCookie('token');
                        return res.status(401).send('not ok');
                    }
                })();
            }
            if(result['type'] === "seller"){
                (async()=>{
                    const user=await db.collection('seller').find({'_id':ObjectId(result['_id'])}).toArray();
                    if(user[0]['_id'].toString() === result['_id'].toString()){
                        return res.status(200).send('OK');
                    }else{
                        res.clearCookie('token');
                        return res.status(401).send('not ok');
                    }
                })();
            }
        })      
    });
};

exports.signout=function (req, res) {
    res.clearCookie('token');
    res.status(200).send('Signed Out');
};