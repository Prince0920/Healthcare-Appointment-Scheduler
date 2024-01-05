const e = require('express');
const DoctorAppointment = require('../../models/doctorAppointment');
const PatientProfile = require('../../models/patientProfile');
const User = require('../../models/userModels');
const uploadImageToCloudnary = require('../../utils/uploadImageToCloudnary');
const PatientDetail = require('../../models/patientDetail');

const reviewByPatient = async (req, res) => {
  try {
    // Extract appointmentId from the request body
    const { appointmentId, rating, feedback } = req.body;

    await DoctorAppointment.findOneAndUpdate(
      { _id: appointmentId },
      {
        review: {
          rating: rating,
          feedback: feedback,
        },
      }
    );

    // Send the response
    // console.log(' I am in review by patient route .... ', req.body);
    return res.status(201).json({
      success: true,
      data: 'resp',
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings.',
      error: error.message,
    });
  }
};

module.exports = {
  reviewByPatient,
};
