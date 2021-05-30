var express = require('express');
var router = express.Router();
var cart=require('../controllers/cart_controller');
const verifyToken = require('./verifyToken');

router.get("/getcart",verifyToken,cart.getcart);
router.post("/addtocart",verifyToken,cart.addtocart);
router.delete("/delete",verifyToken,cart.delete);
module.exports= router;