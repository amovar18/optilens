var express = require('express');
var router = express.Router();
var order=require('../controllers/orderscontrollers');
const verifyToken = require('./verifyToken');

router.get("/getall",verifyToken,order.getall);
router.get("/getallpending",verifyToken,order.getallpending);
router.post("/setdelivery",verifyToken,order.setdelivery);
module.exports= router;