const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const verifyToken = require('./verifyToken');

router.get("/getstatus",admin.checkstatus);
router.get("/signout",verifyToken,admin.signout);
router.post("/signin",admin.authenticate);
router.get("/:usertype", admin.fetchUsers)
router.post("/:usertype/setunset", admin.setUsers)
module.exports= router;