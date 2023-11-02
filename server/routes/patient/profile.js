const express = require('express');

//router object
const router = express.Router();
const patientProfile = require('../../controllers/patient/profile');
const authMiddleware = require('../../config/middlewares/authMiddleware');

//profile || put
router.put('/profile', authMiddleware, patientProfile.patientProfileController);

module.exports = router;
