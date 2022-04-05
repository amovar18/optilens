const express = require('express');
const router = express.Router();
const order=require('../controllers/ordersControllers');
const verifyToken = require('./verifyToken');

router.get("/getall",verifyToken,order.getall);
router.get("/getallpending",verifyToken,order.getallpending);
router.post("/setdelivery",verifyToken,order.setdelivery);
module.exports= router;