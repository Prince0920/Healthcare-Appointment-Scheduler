const express = require('express');
//router object
const router = express.Router();
const authMiddleware = require('../../config/middlewares/authMiddleware');
const paypalPayments = require('../../controllers/paymentCtrl/paypalPaymentCtrl');

// Payment by paypal create order
router.post(
  '/patient-pay-paypal',
  authMiddleware,
  paypalPayments.patentPayByPaypal
);

// capture paypal payment
router.post(
  '/capture-paypal-order',
  authMiddleware,
  paypalPayments.capturePaypalPayment
);

module.exports = router;
