const mongoose = require('mongoose');

const doctorAppointmentSchema = new mongoose.Schema({
  patientProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientProfile',
    required: true,
  },
  doctorProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorProfile',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String, // You can use enum to represent different appointment statuses (e.g., 'scheduled', 'completed', 'cancelled')
    default: 'scheduled',
  },

  message: {
    type: String,
  },
  // Add other relevant fields for the appointment
});

const DoctorAppointment = mongoose.model(
  'DoctorAppointment',
  doctorAppointmentSchema
);

module.exports = DoctorAppointment;
