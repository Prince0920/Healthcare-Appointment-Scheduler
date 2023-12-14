const express = require('express');

//router object
const router = express.Router();
const myBookingsController = require('../../controllers/patient/myBookingController');
const authMiddleware = require('../../config/middlewares/authMiddleware');
const { upload } = require('../../utils/multerUpload');

//get all
router.get('/', authMiddleware, myBookingsController.getAllBookingsController);

//get all
router.delete('/', authMiddleware, myBookingsController.removeAppointmentController);

// upload medical reports
router.put('/medical-report', authMiddleware, upload.single('avatar'), myBookingsController.uploadMedicalReportController);

module.exports = router;
