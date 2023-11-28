const mongoose = require('mongoose');

const patientDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns this profile
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  medicalHistory: [
    {
      condition: String,
      diagnosisDate: Date,
      treatment: String,
    },
  ],
  // You can add more fields as needed
}, {
  timestamps: true, // This will add createdAt and updatedAt fields to your schema
});

const PatientDetail = mongoose.model('PatientDetail', patientDetailSchema);

module.exports = PatientDetail;
