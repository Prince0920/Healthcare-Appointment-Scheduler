const mongoose = require('mongoose');

const doctorAppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns this profile
    required: true,
  },
  patientDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientDetail',
    required: true,
  },
  doctorProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorProfile',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String, // You can use enum to represent different appointment statuses (e.g., 'scheduled', 'completed', 'cancelled')
    default: 'scheduled',
  },
  paymentStatus: {
    type: String, // You can use enum to represent different statuses (e.g., 'Successful', 'Failed', 'Refunded')
    default: 'pending',
  },
  medicalReport: {
    type: String,
  },
  message: {
    type: String,
  },
  reasonOfAppointment: {
    type: String,
  },
  review: {
    rating: Number,
    feedback: String,
  },
});

const DoctorAppointment = mongoose.model('DoctorAppointment', doctorAppointmentSchema);

module.exports = DoctorAppointment;
