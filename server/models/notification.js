// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    message: String,
    severity: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    // timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields to your schema
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
