const e = require('express');
const DoctorAppointment = require('../../models/doctorAppointment');
const PatientProfile = require('../../models/patientProfile');
const User = require('../../models/userModels');

const getAllBookingsController = async (req, res) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    // Find user data based on userId
    const userData = await User.findOne({ _id: userId });

    // Find all appointments associated with the patientProfileId and populate the doctorProfileId
    const appointment_data = await DoctorAppointment.find({ patientProfileId: userId }).populate(
      'doctorProfileId'
    );

    // Map through the appointment data to create a new structure
    const resp = await Promise.all(
      appointment_data.map(async e => {
        // Find doctor's data based on userId
        const doctors_data = await User.findOne({ _id: e.doctorProfileId.userId });

        // Create a new structure for the response
        return {
          _id: e._id,
          fullname: userData.fullname,
          doctorFullName: doctors_data.fullname,
          status: e.status,
          phone: e.doctorProfileId.phone,
        };
      })
    );

    // Send the response
    return res.status(201).json({
      success: true,
      data: resp,
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

// Export the controller
module.exports = getAllBookingsController;

module.exports = { getAllBookingsController };
