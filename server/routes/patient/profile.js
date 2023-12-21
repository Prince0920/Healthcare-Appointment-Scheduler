const express = require('express');

//router object
const router = express.Router();
const patientProfile = require('../../controllers/patient/profile');
const authMiddleware = require('../../config/middlewares/authMiddleware');
const { upload } = require('../../utils/multerUpload');

//create profile || put
router.put('/profile', authMiddleware, patientProfile.createPatientProfileController);

// getting profile || get
router.get('/profile', authMiddleware, patientProfile.getPatientProfileController);

//upload profile
router.post(
    '/profile-pitcher',
    authMiddleware,
    upload.single('avatar'),
    patientProfile.uploadProfilePitcher
  );

module.exports = router;
