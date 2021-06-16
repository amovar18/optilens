const express = require('express');
const app = express();
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const jwt=require('jsonwebtoken');
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());

exports.getalltransactions=function (req, res) { 
    MongoClient.connect(process.env.MONGO_URI, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        const token=req.cookies.token;
        if(token){
            jwt.verify(token,key,(err,result)=>{
                if(err){
                    return res.status(500).send('internalerror');
                }
                (async()=>{
                    const transaction = await db.collection('transactions').find({'customerid':ObjectId(result['_id'])}).toArray();
                    if(transaction.length > 0){
                        return res.status(200).send(transaction);
                    }else{
                        return res.status(200).send([]);
                    }            
                })();
            });
        }else{
            return res.status(401).send('not authenticated');
        }
    });
};

exports.single_transaction=function (req, res) {
    const tid=req.params.id;
    MongoClient.connect(process.env.MONGO_URI, function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        const token=req.cookies.token;
        if(token){
            jwt.verify(token,key,(err,result)=>{
                if(err){
                    return res.status(500).send('internalerror');
                }
                (async()=>{
                    const transcation = await db.collection('transactions').find({'_id':ObjectId(tid)}).toArray();
                    if(transcation.length>0){
                        return res.status(200).send(transcation);
                    }else{
                        return res.status(200).send([]);
                    }            
                })();            
            });
        }else{
            return res.status(401).send('not authenticated');
        }
    });
};
exports.insert=function (req, res) {
    MongoClient.connect(process.env.MONGO_URI, function (err, client) {
        if (err) throw err
        const token=req.cookies.token;
        if(token){
            jwt.verify(token,key,(err,result)=>{
                const cid=result['_id'];
                if(err){
                    return res.status(500).send('internalerror');
                }
                (async()=>{
                    const tot=new Date();
                    const date=tot.getDate()+'/'+tot.getMonth()+'/'+tot.getFullYear()+'-'+tot.getHours()+':'+tot.getMinutes()+':'+tot.getMilliseconds();
                    const db = client.db('opticonnect');
                    const cart = await db.collection('customer').find({'_id':ObjectId(result['_id'])}).project({'cart':1}).toArray();
                    cart[0].cart.forEach(element => {
                        element['ordered']=1;
                        element['in_transit']=0;
                        element['awbno']='';
                        element['delivery_partner']='';
                        
                    });
                    if(cart.length>0){
                        const tobeinserted={'customerid':ObjectId(result['_id']),'date':date,'products':cart[0]['cart'],'deliveryaddress':req.body.delivery_address,'clientname':req.body.name,'total_price':req.body.total_price};
                        db.collection('transactions').insertOne(tobeinserted,function(err,obj){
                            db.collection('customer').updateOne({'_id':ObjectId(cid)},{$set:{'cart':[]}},function(err,obj){
                                if(obj.modifiedCount===1) 
                                    return res.status(200).send("Done");
                            }); 
                        });
                    }
                })();
            });
        }else{
            return res.status(401).send('not authenicated');
        }
    });
};