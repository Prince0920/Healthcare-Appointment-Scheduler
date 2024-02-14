const express = require("express");
//router object
const router = express.Router();
const authMiddleware = require("../../config/middlewares/authMiddleware");
const paypalPayments = require("../../controllers/paymentCtrl/paypalPaymentCtrl");

// Book appointment with doctor
router.post(
  "/patient-pay-paypal",
  authMiddleware,
  paypalPayments.patentPayByPaypal
);

module.exports = router;
