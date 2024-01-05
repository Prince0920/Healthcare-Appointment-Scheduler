const express = require('express');

//router object
const router = express.Router();
const reviewController = require('../../controllers/patient/reviewController');
const authMiddleware = require('../../config/middlewares/authMiddleware');

router.post('/', authMiddleware, reviewController.reviewByPatient);

module.exports = router;
