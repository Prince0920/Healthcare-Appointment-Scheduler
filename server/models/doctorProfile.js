const mongoose = require('mongoose');

// Define a schema for the doctor profiles
const doctorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns this profile
    required: true,
  },
  profileImage: {
    type: String,
  },

  // basic details
  gender: String,
  dateOfBirth: Date,
  phone: {
    type: String,
  },

  // Address
  address: {
    street: String,
    landmark: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },

  //   education and experience
  education: String,
  experience: String,

  specilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Speciality', // Reference to the user who owns this profile
  },
  certifications: [String], // Array of certifications
  workingHours: [],

  // Additional Information
  about: {
    type: String,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Reference to reviews for the doctor
  ratings: {
    averageRating: Number, // Calculated average rating based on reviews
    totalRatings: Number, // Total number of ratings received
  },
  telemedicine: Boolean, // Indicates whether the doctor offers telemedicine services
});

// Create the Doctor model
const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);

module.exports = DoctorProfile;
