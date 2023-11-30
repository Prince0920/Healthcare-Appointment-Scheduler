const express = require('express');

//router object
const router = express.Router();
const patientDetailController = require('../../controllers/patient/patientDetailController');
const authMiddleware = require('../../config/middlewares/authMiddleware');

//And New Patient
router.post('/add', authMiddleware, patientDetailController.addPatient);

module.exports = router;