var express = require('express');
var router = express.Router();
var seller=require('../controllers/sellercontroller');

router.post("/create",seller.create);
router.get("/allowed",seller.isallowed);
router.get("/availability/:username",seller.available);
module.exports= router;