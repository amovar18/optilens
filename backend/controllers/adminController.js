const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// get config consts
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

// access config const
app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());
/**
 * @apiVersion 0.2.0
 * @api {post} /auth/signin signin or authenticate a user.
 * @apiSuccess {cookie} Token containing id and type of user details.
 * @apiSuccess {String} userType type of user.
 * @apiSuccess {Object[]} Links Available links for user.
 * @apiError Wrong password The provided password was wrong.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
*/
exports.authenticate=function (req, res) {
    if(req.body.usernam === 'admin' && req.body.password === 'admin'){
        const payload = {'username':'admin'}
        let token = jwt.sign(payload, key,{expiresIn: '72h'});
        return res.cookie('token', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true,secure:true,sameSite:'none'}).send({
            'links':[{title:'Home', path:'/'},{ title: `Customers`, path: `/customers` },{ title: `Sellers`, path: `/sellers` },{ title: `Sales`, path: `/sales` },{ title: `Logout`, path: `/logout` }],
        });
    }
};


exports.checkstatus=function (req, res) {
    const token = req.cookies.token;
    if(token === null || token === undefined) return res.status(401).send('error');
    jwt.verify(token, key, (error,result)=>{
        if(error){
            return res.status(500).send(result);
        }
        return res.status(200).send({
            'links':[{title:'Home', path:'/'},{ title: `Customers`, path: `/customers` },{ title: `Sellers`, path: `/sellers` },{ title: `Sales`, path: `/sales` },{ title: `Logout`, path: `/logout` }]
        });
    }); 
};

exports.signout=function (req, res) {
    res.clearCookie('token',{httpOnly:true, sameSite:'none',secure:true});
    res.status(200).send([]);
};
exports.fetchUsers = function(req,res){
    MongoClient.connect(process.env.MONGO_URI,{ useUnifiedTopology: true }, async function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        const customer = await db.collection(req.body.users).find({'_id':ObjectId(req.body['_id'])}).toArray();;
        return res.send({'customers':customer});
    });
}
exports.fetchUsers = function(req,res){
    MongoClient.connect(process.env.MONGO_URI,{ useUnifiedTopology: true }, async function (err, client) {
        if (err) throw err
        const db = client.db('opticonnect');
        const result = await db.collection(req.body.users).updateOne({'_id':ObjectId(req.body['_id'])},{$set:[{active: req.body.activate==='activate'?1:0}]});
        return res.status(result?200:500);
    });
}