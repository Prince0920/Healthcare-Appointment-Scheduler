const express = require('express');

//router object
const router = express.Router();
const authMiddleware = require('../config/middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController');

router.get('/', authMiddleware, notificationController.getAllNotifications);

module.exports = router;
