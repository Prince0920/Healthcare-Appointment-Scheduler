const express = require('express');

//router object
const router = express.Router();
const doctorProfile = require('../../controllers/doctor/profile');
const authMiddleware = require('../../config/middlewares/authMiddleware');

//create profile || put
router.put('/profile', authMiddleware, doctorProfile.createDoctorProfileController);

// getting profile || get
router.get('/profile', authMiddleware, doctorProfile.getDoctorProfileController);

// getting all doctors || get
router.get('/', authMiddleware, doctorProfile.getAllDoctorController);

// Book appointment with doctor
router.post('/book-appointment', authMiddleware, doctorProfile.bookAppointmentWithDoctor);

module.exports = router;
