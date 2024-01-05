const Notification = require('../models/notification');

const getAllNotifications = async (req, res) => {
  try {
    // Extract userId from the logged-in user's request
    const userId = req.user.userId;

    // Retrieve notification details for the specified user
    const notificationDetails = await Notification.find({ receiverId: userId });

    // Extract only the 'message' field from each notification for response
    const requiredResponse = notificationDetails.map(notification => {
      return { message: notification.message };
    });

    // Log the requiredResponse for debugging purposes
    // console.log('Notification Messages:', requiredResponse);

    // Return a success response with the extracted notification messages
    return res.status(200).json({
      success: true,
      data: requiredResponse,
      message: 'Notifications retrieved successfully.',
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error getting notifications:', error);

    // Return an error response with details about the failure
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve notifications.',
      error: error.message,
    });
  }
};

module.exports = { getAllNotifications };
