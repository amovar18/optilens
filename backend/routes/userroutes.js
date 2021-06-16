const express = require('express');
const router = express.Router();
const user=require('../controllers/userscontroller');
router.post("/create",user.create);
router.get("/allowed",user.isallowed);
router.get("/allowedgeneral",user.isallowedgeneral);
router.get("/availability/:username",user.available);
module.exports= router;