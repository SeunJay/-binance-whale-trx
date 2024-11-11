const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/TransactionController");

router.get("/", TransactionController.fetchTransactions);

module.exports = router;
