const { request } = require('express');
var express = require('express');
var router = express.Router();
var auth = require('../controllers/authenticationcontroller');
const verifyToken = require('./verifyToken');

router.get("/signout",verifyToken,auth.signout);
router.post("/signin",auth.authenticate);
router.get("/getlinks",auth.links);
module.exports= router;