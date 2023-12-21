const express = require('express');

//router object
const router = express.Router();
const doctorProfile = require('../../controllers/doctor/profile');
const authMiddleware = require('../../config/middlewares/authMiddleware');
const doctorAppointments = require('../../controllers/doctor/docAppointmentCtrl');
const { upload } = require('../../utils/multerUpload');

//create profile || put
router.put(
  '/profile',
  authMiddleware,
  doctorProfile.createDoctorProfileController
);

//upload profile
router.post(
  '/profile-pitcher',
  authMiddleware,
  upload.single('avatar'),
  doctorProfile.uploadProfilePitcher
);

// getting profile || get
router.get(
  '/profile',
  authMiddleware,
  doctorProfile.getDoctorProfileController
);

//get current doctor all appointments
router.get(
  '/doctorAppointments',
  authMiddleware,
  doctorAppointments.getDoctorAppointments
);

//update pointment status by current doctor
router.post(
  '/docUpdateAppoStatus',
  authMiddleware,
  doctorAppointments.docUpdateAppoStatusCtrl
);

// router.get('/doctorAppointments', (req, res) => {
//   res.send('yes reached till here');
// });

// getting all doctors || get
router.get('/', authMiddleware, doctorProfile.getAllDoctorController);


module.exports = router;
