const express = require('express');
const router = express.Router();
const product=require('../controllers/products_controller');
const verifyToken = require('./verifyToken');

router.get("/getsingle/:id",product.getsingle);
router.post("/create",verifyToken,product.create);
router.get("/sort/:type/:price/:sort/:page",product.sort);
module.exports= router;