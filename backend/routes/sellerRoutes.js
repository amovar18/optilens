const express = require('express');
const router = express.Router();
const seller=require('../controllers/sellerController');

router.post("/create",seller.create);
router.get("/allowed",seller.isallowed);
router.get("/availability/:username",seller.available);
module.exports= router;