var express = require('express');
var router = express.Router();
var product=require('../controllers/products_controller');
const verifyToken = require('./verifyToken');

router.get("/all/:page",product.getall);
router.get("/contact_lens/:page",product.getcontact_lens);
router.get("/spectacles/:page",product.getspectacles);
router.get("/sunglasses/:page",product.getsunglasses);
router.get("/getsingle/:id",product.getsingle);
router.post("/create",verifyToken,product.create);
router.get("/sort/:type/:price/:sort/:page",product.sort);
module.exports= router;