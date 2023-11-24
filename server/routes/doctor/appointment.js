const express = require('express');

//router object
const router = express.Router();
const doctorAppointment = require('../../controllers/doctor/appointment');
const authMiddleware = require('../../config/middlewares/authMiddleware');

// Book appointment with doctor
router.post('/book-appointment', authMiddleware, doctorAppointment.bookAppointmentWithDoctor);

module.exports = router;
