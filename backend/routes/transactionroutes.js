const express = require('express');
const router = express.Router();
const transaction=require('../controllers/transaction_controller');
const verifyToken = require('./verifyToken');

router.get("/:id/",verifyToken,transaction.single_transaction);
router.get("/",verifyToken,transaction.getalltransactions);
router.post("/insert",verifyToken,transaction.insert);
module.exports= router;