const express = require('express');

//router object
const router = express.Router();
const myBookingsController = require('../../controllers/patient/myBookingController');
const authMiddleware = require('../../config/middlewares/authMiddleware');

//get all
router.get('/', authMiddleware, myBookingsController.getAllBookingsController);

module.exports = router;
