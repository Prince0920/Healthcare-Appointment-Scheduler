const express = require('express');

//router object
const router = express.Router();
const myReviewController = require('../../controllers/doctor/myReview');
const authMiddleware = require('../../config/middlewares/authMiddleware');

// Get my review by doctor
router.get('/my-review', authMiddleware, myReviewController.getMyReviews);

module.exports = router;
