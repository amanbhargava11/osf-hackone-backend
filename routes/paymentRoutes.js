const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment, manualApprove } = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/manual-approve", manualApprove);

module.exports = router;