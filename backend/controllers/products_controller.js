const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const firebase = require("firebase/app");
require('firebase/storage');
global.XMLHttpRequest=require('xhr2');
const upload = multer({storage:multer.memoryStorage()}).array('image');
const firebaseConfig = {
    apiKey: "AIzaSyAAtMzILEeWN-A1xByAb_ANvkMlVTWRvbk",
    authDomain: "opticonnect-cb1ae.firebaseapp.com",
    projectId: "opticonnect-cb1ae",
    storageBucket: "opticonnect-cb1ae.appspot.com",
    messagingSenderId: "666794700836",
    appId: "1:666794700836:web:96788ccc8de614412268b1",
    measurementId: "G-3J8TTJRD9P"
  };

firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
exports.create=function (req, res) {
    const token = req.cookies.token;
    jwt.verify(token, key, (err, result) => {
        if (err) return res.sendStatus(403);    
        const id=result['_id'];
        MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
            if (err) throw err
            const db = client.db('opticonnect');
            upload(req,res,function(err){
                if (err instanceof multer.MulterError) {
                    return res.send(err);
                 } else if (err) {
                    return res.send(err);
                 }else{
                    const files=req.files;
                    let path=[];
                    files.forEach((file) =>{
                        const uploadTask = storageRef.child('products/'+id+'/'+req.body.productname+'_'+file.originalname+'_'+Date.now()).put(file.buffer);
                        uploadTask.on('state_changed', (snapshot) => {

                        }, (error) => {
                            console.log(error);
                        }, () => {
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                console.log('done');
                                path.push(downloadURL);
                                if(path.length===4){
                                    const tobeinserted={'productname':req.body.productname,'productdescription':req.body.productdescription,'image':path,'brand':req.body.brand,'price':parseInt(req.body.productprice),'producttype':req.body.producttype,'sellerid':ObjectId(id)};
                                    db.collection('products').insertOne(tobeinserted,(err, object)=> {
                                        if(object){
                                            return res.status(200).send('AOK!');            
                                        }
                                    });
                                }
                            });
                        });
                    });
                    
                 }
            });
        });
    });
};
exports.getsingle=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        (async()=>{
            const result = await db.collection('products').aggregate([{$match:{'_id':ObjectId(req.params.id)}},{$lookup:{from: 'seller',localField: 'sellerid',foreignField: '_id',as: 'shop'}}]).toArray();
            if (result.length > 0){
                return res.status(200).send(result);
            }else{
                return res.status(200).send(result);
            }   
        })();
    });
};
exports.getall=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
        if (err) throw err

        const db = client.db('opticonnect');
        (async () =>{
            const result = await db.collection('products').aggregate([{$lookup:{from: 'seller',localField: 'sellerid',foreignField: '_id',as: 'shop'}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
            if (result.length > 0){
                return res.status(200).send(result);
            }else{
                return res.status(200).send(result);
            }
        })();
        
    });
};
exports.getsunglasses=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
        if (err) throw err

        const db = client.db('opticonnect');
        (async ()=>{
            const result = await db.collection('products').aggregate([{$match:{'producttype':'sunglasses'}},{ $skip : ((parseInt(req.params.page)-1)*10) },{$lookup:{from: 'seller',localField: 'sellerid',foreignField: '_id',as: 'shop'}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
            if (result.length > 0){
                return res.status(200).send(result);
            }else{
                return res.status(200).send(result);
            }   
        })();
    });
};

exports.getcontact_lens=function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
        if (err) throw err

        const db = client.db('opticonnect');
        (async ()=>{
            const result = await db.collection('products').aggregate([{$match:{'producttype':'contact_lens'}},{$lookup:{from: 'seller',localField: 'sellerid',foreignField: '_id',as: 'shop'}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
            if (result.length > 0){
                return res.status(200).send(result);
            }else{
                return res.status(200).send(result);
            }
        })();
    });
};

exports.getspectacles= function (req, res) {
        
    MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
        if (err) throw err

        const db = client.db('opticonnect');
        (async ()=>{
            const result = await db.collection('products').aggregate([{$match:{'producttype':'spectacles'}},{$lookup:{from: 'seller',localField: 'sellerid',foreignField: '_id',as: 'shop'}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
            if (result.length > 0){
                return res.status(200).send(result);
            }else{  
                return res.status(200).send(result);
            }
        })();
    });
};
exports.sort=function(req,res){
    MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
        if (err) throw err

        const db = client.db('opticonnect');
        (async ()=>{
            if(req.params.type==='all'){
                if(req.params.sort==='up'){
                    if(req.params.price!=='NAN'){
                        const start_price=parseInt(req.params.price);
                        const end_price=start_price+1000;
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': 1}},{'$match': {'price': {'$gte': start_price, '$lte': end_price}}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }

                    }else{
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': 1}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }
                }else if(req.params.sort==='down'){
                    if(req.params.price!=='NAN'){
                        const start_price=parseInt(req.params.price);
                        const end_price=start_price+1000;
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': -1}},{'$match': {'price': {'$gte': start_price, '$lte': end_price}}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }else{
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': -1}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }
                }else{
                    if(req.params.price!=='NAN'){
                        const start_price=parseInt(req.params.price);
                        const end_price=start_price+1000;
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}},{'$match': {'price': {'$gte': start_price, '$lte': end_price}}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }            
                    }else{
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }
                }
            }else{
                if(req.params.sort==='up'){
                    if(req.params.price!=='NAN'){
                        const start_price=parseInt(req.params.price);
                        const end_price=start_price+1000;
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': 1}},{'$match': {'price': {'$gte': start_price, '$lte': end_price}}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }            
                    }else{
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': 1}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }
                }else if(req.params.sort==='down'){
                    if(req.params.price!=='NAN'){
                        const start_price=parseInt(req.params.price);
                        const end_price=start_price+1000;
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': -1}},{'$match': {'price': {'$gte': start_price, '$lte': end_price}},'producttype':req.params.type},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }            
                    }else{
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}}, {'$sort': {'price': -1}},{'$match': {'producttype':req.params.type}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }
                }else if(req.params.sort==='NAN'){
                    if(req.params.price!=='NAN'){
                        const start_price=parseInt(req.params.price);
                        const end_price=start_price+1000;
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}},{'$match': {'price': {'$gte': start_price, '$lte': end_price},'producttype':req.params.type}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }            
                    }else{
                        const result = await db.collection('products').aggregate([{'$lookup': {'from': 'seller', 'localField': 'sellerid', 'foreignField': '_id', 'as': 'shop'}},{'$match': {'producttype':req.params.type}},{ $skip : ((parseInt(req.params.page)-1)*10) },{ $limit : 10 }]).toArray();
                        if (result.length > 0){
                            return res.status(200).send(result);
                        }else{
                            return res.status(200).send(result);
                        }
                    }
                }
            }   
        })();
    });
}