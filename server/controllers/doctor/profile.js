const DoctorAppointment = require('../../models/doctorAppointment');
const DoctorProfile = require('../../models/doctorProfile');
const PatientProfile = require('../../models/patientProfile');
const userModel = require('../../models/userModels');
const uploadImageToCloudnary = require('../../utils/uploadImageToCloudnary');

// Doctor Profile create
const createDoctorProfileController = async (req, res) => {
  try {
    const { userId } = req.body;

    // console.log("UserIdUserIdUserId",userId)
    // console.log("req.bodyreq.body", req.body)

    // Check if user's data is already exists
    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    userData.set({ fullname: req.body.fullName });
    await userData.save();

    // Check if the user's profile already exists
    let doctorData = await DoctorProfile.findOne({ userId });
    console.log('doctorData', doctorData);
    if (!doctorData) {
      // If the profile doesn't exist, create a new one
      doctorData = new DoctorProfile(req.body);
    } else {
      // If the profile exists, update it with the new data
      doctorData.set(req.body);
    }

    await doctorData.save();

    return res.status(201).json({
      success: true,
      message: 'Profile Updated Successfully!',
    });
  } catch (error) {
    console.error('Error creating/updating patient profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create/update patient profile.',
      error: error.message,
    });
  }
};

const uploadProfilePitcher = async (req, res) => {
  try {
    let myCloud;
    if (req.file) {
      myCloud = await uploadImageToCloudnary(req.file?.path);
    }
    console.log("myCloud::::", myCloud)
    res.send({ success: true });
  } catch (error) {
    console.log('Error in uploading profile pitcher', error);
  }
};

// Patient Profile get
const getDoctorProfileController = async (req, res) => {
  try {
    const { userId } = req.body;

    let userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const doctorData = await DoctorProfile.findOne({ userId });

    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found.',
      });
    }

    let response = {
      ...doctorData.toObject(),
      fullName: userData.fullname,
    };
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error getting patient profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get patient profile.',
      error: error.message,
    });
  }
};

// Get all doctors
const getAllDoctorController = async (req, res) => {
  try {
    let doctorData = await DoctorProfile.find({}).populate('userId');
    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found.',
      });
    }
    const formattedDoctorData = doctorData.map(doctor => {
      const { userId } = doctor;

      return {
        doctorProfileId: doctor._id,
        fullName: userId.fullname,
        email: userId.email,
        usertype: userId.usertype,
        address: doctor.address,
        gender: doctor.gender,
        education: doctor.education,
        phone: doctor.phone,
        experience: doctor.experience,
        medicalSpecialty: doctor.medicalSpecialty,
        workingHours: doctor.workingHours,
        about: doctor.about,
        review: doctor.review,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedDoctorData,
    });
  } catch (error) {
    console.error('Error getting :', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get patient profile.',
      error: error.message,
    });
  }
};

module.exports = {
  createDoctorProfileController,
  getDoctorProfileController,
  getAllDoctorController,
  uploadProfilePitcher,
};
