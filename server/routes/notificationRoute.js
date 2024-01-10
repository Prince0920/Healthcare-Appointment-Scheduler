const express = require('express');

//router object
const router = express.Router();
const authMiddleware = require('../config/middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController');

// path: /api/v1/notifications
router.get('/', authMiddleware, notificationController.getAllNotifications);

// path: /api/v1/notifications/read-notification
router.put('/read-notification', authMiddleware, notificationController.readNotification);

module.exports = router;
