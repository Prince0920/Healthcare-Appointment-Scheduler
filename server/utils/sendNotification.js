const Notification = require('../models/notification');

const sendNotification = async (senderId, receiverId, message, severity = 'low') => {
  try {
    // Create a new notification
    const newNotification = new Notification({
      receiverId: receiverId, // assuming userId is used to represent the recipient
      senderId: senderId,
      message: message,
      severity: severity,
    });

    // Save the notification to the database
    const savedNotification = await newNotification.save();

    return savedNotification; // Return the saved notification data
  } catch (error) {
    // Handle errors, log them, or throw if necessary
    console.error('Error sending notification:', error);
    throw new Error('Failed to send notification');
  }
};

module.exports = sendNotification;
