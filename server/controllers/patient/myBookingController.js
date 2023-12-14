const e = require('express');
const DoctorAppointment = require('../../models/doctorAppointment');
const PatientProfile = require('../../models/patientProfile');
const User = require('../../models/userModels');
const uploadImageToCloudnary = require('../../utils/uploadImageToCloudnary');
const PatientDetail = require('../../models/patientDetail');

const getAllBookingsController = async (req, res) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    // Find user data based on userId
    const userData = await User.findOne({ _id: userId });

    // Find all appointments associated with the patientProfileId and populate the doctorProfileId
    const appointment_data = await DoctorAppointment.find({ userId: userId })
      .populate('doctorProfileId')
      .populate('patientDetailId');

    // Map through the appointment data to create a new structure
    const resp = await Promise.all(
      appointment_data.map(async e => {
        // Find doctor's data based on userId
        const doctors_data = await User.findOne({ _id: e.doctorProfileId.userId });

        // Create a new structure for the response
        return {
          _id: e._id,
          fullname: e.patientDetailId.patientName,
          doctorFullName: doctors_data.fullname,
          status: e.status,
          phone: e.doctorProfileId.phone,
          appointmentDate: e.appointmentDate,
          reasonOfAppointment: e?.reasonOfAppointment,
          message: e?.message,
          medicalReport: e.medicalReport
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

const removeAppointmentController = async (req, res) => {
  try {
    // Extract appointmentId and status from the request query
    const { appointmentId } = req.query;

    // Check if appointmentId and status are provided
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'Appointment ID and status are required.',
      });
    }

    // Find and delete the appointment based on appointmentId and status
    const deletedAppointment = await DoctorAppointment.findOneAndDelete({
      _id: appointmentId,
      status: 'scheduled',
    });

    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found with the given ID and status.',
      });
    }

    // Send the response
    return res.status(200).json({
      success: true,
      data: deletedAppointment,
      message: 'Appointment deleted successfully.',
    });
  } catch (error) {
    console.error('Error removing appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove appointment.',
      error: error.message,
    });
  }
};

const uploadMedicalReportController = async (req, res) => {
  try {
    const patientDetailId = req.body.patientDetailId;
    console.log('patientDetailId::::::::::::::::::', patientDetailId);
    let myCloud;
    if (req.file) {
      myCloud = await uploadImageToCloudnary(req.file?.path);
    }

    console.log('myCloud::::::::::::::::::', myCloud);

    const saved_pdf_url = myCloud?.secure_url;

    let patientDetail = await DoctorAppointment.findOneAndUpdate(
      { _id: patientDetailId },
      {
        medicalReport: saved_pdf_url,
      }
    );

    console.log('patientDetail::::::::::::::::::', patientDetail);

    if (!patientDetail) {
      return res.status(404).json({
        success: false,
        message: 'Patient Detail not found.',
      });
    }

    res.send({ success: true });
  } catch (error) {
    console.log('Error in uploading medical report', error);
  }
};

module.exports = {
  getAllBookingsController,
  removeAppointmentController,
  uploadMedicalReportController,
};
