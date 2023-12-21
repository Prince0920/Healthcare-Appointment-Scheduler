const express = require('express');

//router object
const router = express.Router();
const authMiddleware = require('../../config/middlewares/authMiddleware');
const stripePayments = require('../../controllers/paymentCtrl/stripePaymentCtrl');

// Book appointment with doctor
router.post('/patient-pay-stripe', authMiddleware, stripePayments.patentPayBystripe);



module.exports = router;
