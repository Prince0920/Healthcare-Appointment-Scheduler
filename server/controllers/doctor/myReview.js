const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const SpecialityModel = require('../../models/SpecialityModel');
const DoctorAppointment = require('../../models/doctorAppointment');
const DoctorProfile = require('../../models/doctorProfile');

// Doctor Appointment create
const getMyReviews = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('User Id From Body: ', userId);

    const doctorProfileData = await DoctorProfile.findOne({
      userId: userId,
    });

    const appointmentsData = await DoctorAppointment.find({
      doctorProfileId: doctorProfileData._id,
      status: 'completed',
    }).populate('patientDetailId');

    let requiredResponse = appointmentsData.map(appointment => {
      return {
        _id: appointment?._id,
        patientName: appointment?.patientDetailId?.patientName,
        status: appointment?.status,
        review: appointment?.review,
      };
    });

    return res.status(200).json({
      success: true,
      data: requiredResponse,
      message: 'Review Data',
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews.',
      error: error.message,
    });
  }
};

module.exports = {
  getMyReviews,
};
