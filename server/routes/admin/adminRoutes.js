const express = require('express');

//router object
const router = express.Router();
const authMiddleware = require('../../config/middlewares/authMiddleware');
const adminController = require('../../controllers/adminCtrl/adminCtrl');
const specialityController = require('../../controllers/adminCtrl/specialityCtrls/SpecialityCtrl');
const { upload } = require('../../utils/multerUpload');

//get admin profile info
router.get(
  '/adminProfileInfo',
  authMiddleware,
  adminController.getadminProfileInfo
);

router.post(
  '/adminUpdateProfile',
  authMiddleware,
  adminController.adminUpdateProfile
);

router.get('/allUsers', authMiddleware, adminController.getallUsers);
router.post(
  '/changeAccountStatus',
  authMiddleware,
  adminController.changeAccountStatus
);

router.post(
  '/addUpdateSpecialityArea',
  authMiddleware,
  specialityController.addUpdateSpecialityTypeCtrl
);

router.get(
  '/getSpecialityAreas',
  authMiddleware,
  specialityController.getSpecialityTypeCtrl
);

router.post(
  '/SpecialityAddUpdate',
  authMiddleware,
  specialityController.addUpdateSpecialityCtrl
);

router.get(
  '/getSpeciality',
  authMiddleware,
  specialityController.getSpecialityCtrl
);

//update speciality area status -----------------------
router.post(
  '/updatSpeciAreaStatus',
  authMiddleware,
  specialityController.updateSpeAreaStaCtrl
);

//update speciality staus -------------------------------
router.post(
  '/updatSpeciStatus',
  authMiddleware,
  specialityController.updateSpeStaCtrl
);

router.post('/updatSpeciStatus', (req, res) => {
  res.send('yes reached till here');
});

//upload profile
router.post(
  '/profile-pitcher',
  authMiddleware,
  upload.single('avatar'),
  adminController.uploadProfilePitcher
);

module.exports = router;
