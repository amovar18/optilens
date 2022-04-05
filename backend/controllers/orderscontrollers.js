const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

exports.getallpending=function (req, res) {
    const token = req.cookies.token;
    if(token===null || token===undefined) res.sendStatus(401);
    jwt.verify(token, key, (err, result) => {
        if(result['type']==='seller'){
            if(err){
                return res.status(500).send('internal error');
            }
            const id=result['_id'];
            MongoClient.connect(process.env.MONGO_URI, function (err, client) {
                if(err){
                    return res.status(500).send('internal error');
                } 
                const db = client.db('opticonnect');
                ( async()=>{
                    const orders = await db.collection('transactions').aggregate([{$match:{'products.sellerId' : ObjectId(id) }},{$match:{$and:[{"products.inTransit":0},{"products.ordered":1}] }},{$unwind: {path:'$products'}}]).toArray();
                    if(orders.length > 0){
                        return res.status(200).send(orders);
                    }else{
                        return res.status(404).send([]);
                    }
                })();
            });
        }
    });
};
exports.getall=function (req, res) {
    const token = req.cookies.token;
    if(token===null || token===undefined) res.sendStatus(401);
    jwt.verify(token, key, (err, result) => {
        if(result['type']==='seller'){
            if(err){
                return res.status(500).send('internal error');
            }
            const id=result['_id'];
            MongoClient.connect(process.env.MONGO_URI, function (err, client) {
                if(err){
                    return res.status(500).send('internal error');
                } 
                const db = client.db('opticonnect');
                ( async()=>{
                    const orders = await db.collection('transactions').aggregate([{$match:{'products.sellerId' : ObjectId(id) }},{$unwind: {path:'$products'}}]).toArray();
                    if(orders.length > 0){
                        return res.status(200).send(orders);
                    }else{
                        return res.status(404).send([]);
                    }
                })();
            });
        }
    });
};
exports.setdelivery=function(req,res){
    const token = req.cookies.token;
    if(token===null|| token===undefined) return res.status(401).send('not authenticated');
    jwt.verify(token,key,(error,result)=>{
        if(error){
            return res.status(500).send('Internal error');
        }
        if(result['type']==='seller'){
            const id = result['_id'];
            const productId = req.body.productId;
            const transactionId = req.body.transactionId;
            const awb = req.body.awb;
            const deliveryPartner = req.body.deliveryPartner;
            MongoClient.connect(process.env.MONGO_URI,(error,client)=>{
                if(error){
                    return res.status(500).send('internal error');
                }
                const db = client.db('opticonnect');
                (async ()=>{
                    const result = await db.collection('transactions').updateOne({'_id':ObjectId(transactionId),'products._id':ObjectId(productId)},{$set:{'products.$.awbno':awb,'products.$.deliveryPartner':deliveryPartner,"products.$.inTransit":1}});
                    if(result.modifiedCount===1){
                        const orders = await db.collection('transactions').aggregate([{$match:{'products.sellerId' : ObjectId(id) }},{$match:{$and:[{"products.inTransit":0},{"products.ordered":1}] }},{$unwind: {path:'$products'}}]).toArray();
                        console.log(orders);
                        if(orders.length > 0){
                            return res.status(200).send(orders);
                        }else{
                            return res.status(404).send([]);
                        }
                    }
                })();
            })
        }else{
            return res.status(403).send('not authorised');
        }
    })
}