const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const e = require('express');

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
            MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
                if(err){
                    return res.status(500).send('internal error');
                } 
                const db = client.db('opticonnect');
                ( async()=>{
                    const orders = await db.collection('transactions').aggregate([{$match:{'products.sellerid' : ObjectId(id) }},{$match:{$and:[{"products.in_transit":0},{"products.ordered":1}] }},{$unwind: {path:'$products'}}]).toArray();
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
            MongoClient.connect('mongodb://localhost:27017/opticonnect', function (err, client) {
                if(err){
                    return res.status(500).send('internal error');
                } 
                const db = client.db('opticonnect');
                ( async()=>{
                    const orders = await db.collection('transactions').aggregate([{$match:{'products.sellerid' : ObjectId(id) }},{$unwind: {path:'$products'}}]).toArray();
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
            const product_id = req.body.product_id;
            const transaction_id = req.body.transaction_id;
            const awb = req.body.awb;
            const delivery_partner = req.body.delivery_partner;
            MongoClient.connect('mongodb://localhost:27017/opticonnect',(error,client)=>{
                if(error){
                    return res.status(500).send('internal error');
                }
                const db = client.db('opticonnect');
                (async ()=>{
                    const result = await db.collection('transactions').updateOne({'_id':ObjectId(transaction_id),'products._id':ObjectId(product_id)},{$set:{'products.$.awbno':awb,'products.$.delivery_partner':delivery_partner,"products.$.in_transit":1}});
                    if(result.modifiedCount===1){
                        const orders = await db.collection('transactions').aggregate([{$match:{'products.sellerid' : ObjectId(id) }},{$match:{$and:[{"products.in_transit":0},{"products.ordered":1}] }},{$unwind: {path:'$products'}}]).toArray();
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