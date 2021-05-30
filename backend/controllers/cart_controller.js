const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectID, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
exports.getcart=function (req, res) {
    const token = req.cookies.token;
    if(token===null || token===undefined) res.satus(401).send('Not authed');
    jwt.verify(token, key, (err, result) => {
        if(err){
            return res.status(500).send('internal error');
        }
        if(result.type==='customer'){
            const cid=result['_id'];

            MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
                if (err) throw err

                const db = client.db('opticonnect');
                (async ()=>{
                    const cart = await db.collection('customer').find({'_id':ObjectId(cid)}).project({'cart':1,'_id':0}).toArray();
                    const total_price = await db.collection('customer').aggregate([{ '$match': { '_id': ObjectId(cid)}}, {'$unwind': {'path': '$cart'}}, {'$unwind': {'path': '$cart.price'}}, {'$group': {'_id': 'total_price', 'total_price': {'$sum': {'$multiply': ['$cart.price', '$cart.quantity']}}}}]).toArray();
                    if(cart[0].cart.length > 0){
                        cart[0]['total_price']=total_price[0]['total_price'];
                        return res.status(200).send(cart);
                    }else{
                        return res.status(200).send([]);
                    }

                })();
            });
        }else{
            return res.status(403).send('not authenticated');
        }
    });
};
exports.delete=function (req, res) {
    const token = req.cookies.token;
    jwt.verify(token, key, (err, result) => {
        if(err){
            return res.status(500).send('internal error');
        }
        if(result.type==='customer'){
            const cid=result['_id'];
            const pid=req.body.pid;
            MongoClient.connect('mongodb://localhost:27017/opticonnect', {useUnifiedTopology: true },function (err, client) {
                if (err) throw err
                const db = client.db('opticonnect');
                (async ()=>{
                    const result =await  db.collection('customer').updateOne({ '_id': ObjectID(cid)},{$pull : {'cart': {'_id':ObjectId(pid)}}});
                    const total_price = await db.collection('customer').aggregate([{ '$match': { '_id': ObjectId(cid)}}, {'$unwind': {'path': '$cart'}}, {'$unwind': {'path': '$cart.price'}}, {'$group': {'_id': '$cart.price', 'total_price': {'$sum': {'$multiply': ['$cart.price', '$cart.quantity']}}}}]).toArray();
                    if(result.modifiedCount === 1 ){
                        db.collection('customer').find({'_id':ObjectId(cid)}).toArray((error,object)=>{
                            object[0]['total_price']=total_price[0]['total_price'];
                            return res.status(200).send(object);
                        });
                    }
                })();
            });
        }
    });
};
exports.addtocart=function (req, res) {
    const token = req.cookies.token;
    jwt.verify(token, key, (err, result) => {
        if(err){
            return res.status(500).send('internal error');
        }
        if(result.type==='customer'){   
            const cid=result['_id'];
            const product_id=req.body.id;
            MongoClient.connect('mongodb://localhost:27017/opticonnect',{ useUnifiedTopology: true }, function (err, client) {
                if (err) throw err
                const db = client.db('opticonnect');
                (async ()=>{
                    const product = await db.collection('products').find({'_id':ObjectId(product_id)}).toArray();
                    const check_if_different= await db.collection('customer').find({ '_id': ObjectID(cid)}).project({'cart.sellerid':1}).toArray();
                    let allowed=true;
                    check_if_different[0]['cart'].forEach((single_seller)=>{
                        if(single_seller['sellerid'].toString()!==product[0]['sellerid'].toString()){
                            allowed=false;
                            return res.status(400).send('cannot have products from 2 different sellers');
                        }
                    })
                    if(product.length > 0 && allowed===true){
                        const cart= await db.collection('customer').find({ '_id': ObjectID(cid),'cart._id':ObjectId(product_id)}).toArray();
                        if(cart.length > 0){
                            product[0]['quantity']=1;
                            product[0]['lens_details']=req.body.lens_details;
                            for(let index=0;index<cart[0]['cart'].length;index++){
                                if(cart[0]['cart'][index]['_id']==product_id){
                                    product[0]['quantity']=cart[0]['cart'][index]['quantity']+1;
                                    break;
                                }
                            };
                            const result = await db.collection('customer').updateOne({ '_id': ObjectID(cid)},{$pull : {'cart': {'_id':ObjectId(product_id)}}}).catch((error)=>{console.log(error)});
                            if(result.modifiedCount===1){
                                db.collection('customer').updateOne({ '_id': ObjectID(cid)},{  $addToSet:{'cart': product[0] } },function(err, object) {
                                    return res.status(200).send(object);
                                });     
                            }
                        }else{
                            product[0]['quantity']=1;
                            product[0]['lens_details']=req.body.lens_details;                    
                            db.collection('customer').updateOne({ '_id': ObjectID(cid)},{  $addToSet:{'cart': product[0] } },{upsert : true},function(err, object) {
                                return res.status(200).send(object);
                            }); 
                        }
                    }
                })();
                
            });
        }else{
            return res.status(403).send('not authorised to use this page');
        }
    });
};