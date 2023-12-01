const express = require('express');

//router object
const router = express.Router();
const adminController = require('../../controllers/adminCtrl/adminCtrl');
const authMiddleware = require('../../config/middlewares/authMiddleware');

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
  adminController.addSpecialityTypeCtrl
);

// router.post('/addSpecialityArea', (req, res) => {
//   res.send('yes reached till here');
// });

module.exports = router;
