const express = require('express');

//router object
const router = express.Router();
const patientProfile = require('../../controllers/patient/profile');
const authMiddleware = require('../../config/middlewares/authMiddleware');

//create profile || put
router.put('/profile', authMiddleware, patientProfile.createPatientProfileController);

// getting profile || get
router.get('/profile', authMiddleware, patientProfile.getPatientProfileController);

module.exports = router;
