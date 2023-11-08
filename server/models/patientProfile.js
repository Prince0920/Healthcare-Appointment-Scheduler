const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns this profile
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    landmark: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  medicalHistory: [
    {
      condition: String,
      diagnosisDate: Date,
      treatment: String,
    },
  ],

  status: {
    type: String,
    default: 'pending', // Default value of "pending"
  },
  // You can add more fields as needed
}, {
  timestamps: true, // This will add createdAt and updatedAt fields to your schema
});

const PatientProfile = mongoose.model('PatientProfile', patientProfileSchema);

module.exports = PatientProfile;
