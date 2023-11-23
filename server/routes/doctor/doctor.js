const express = require('express');

//router object
const router = express.Router();
const doctorProfile = require('../../controllers/doctor/profile');
const authMiddleware = require('../../config/middlewares/authMiddleware');

//create profile || put
router.put('/profile', authMiddleware, doctorProfile.createDoctorProfileController);

// getting profile || get
router.get('/profile', authMiddleware, doctorProfile.getDoctorProfileController);

module.exports = router;
