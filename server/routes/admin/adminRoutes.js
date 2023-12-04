const express = require('express');

//router object
const router = express.Router();
const authMiddleware = require('../../config/middlewares/authMiddleware');
const adminController = require('../../controllers/adminCtrl/adminCtrl');
const specialityController = require('../../controllers/adminCtrl/specialityCtrls/SpecialityCtrl');

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
  '/addSpecialityArea',
  authMiddleware,
  specialityController.addSpecialityTypeCtrl
);

router.get(
  '/getSpecialityAreas',
  authMiddleware,
  specialityController.getSpecialityTypeCtrl
);

router.post(
  '/SpecialityAdd',
  authMiddleware,
  specialityController.addSpecialityCtrl
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

module.exports = router;
