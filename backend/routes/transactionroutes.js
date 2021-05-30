var express = require('express');
var router = express.Router();
var transaction=require('../controllers/transaction_controller');
const verifyToken = require('./verifyToken');

router.get("/:id/",verifyToken,transaction.single_transaction);
router.get("/",verifyToken,transaction.getalltransactions);
router.post("/insert",verifyToken,transaction.insert);
module.exports= router;