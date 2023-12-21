const PatientProfile = require('../../models/patientProfile');
const userModel = require('../../models/userModels');
const uploadImageToCloudnary = require('../../utils/uploadImageToCloudnary');

// Patient Profile create
const createPatientProfileController = async (req, res) => {
  try {
    const { userId } = req.body;

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
    let profileData = await PatientProfile.findOne({ userId });

    if (!profileData) {
      // If the profile doesn't exist, create a new one
      profileData = new PatientProfile(req.body);
    } else {
      // If the profile exists, update it with the new data
      profileData.set(req.body);
    }

    await profileData.save();

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

// Patient Profile get
const getPatientProfileController = async (req, res) => {
  try {
    const { userId } = req.body;

    let userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const profileData = await PatientProfile.findOne({ userId });

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found.',
      });
    }

    let response = {
      ...profileData.toObject(),
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

const uploadProfilePitcher = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log('uploadProfilePitcher', userId);
    // Check if user's data is already exists
    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    let myCloud;
    if (req.file) {
      myCloud = await uploadImageToCloudnary(req.file?.path);
    }
    const saved_image_url = myCloud.secure_url;

    let patientProfile = await PatientProfile.findOneAndUpdate(
      { userId: userData._id },
      {
        profileImage: saved_image_url,
      }
    );

    if (!patientProfile) {
      return res.status(404).json({
        success: false,
        message: 'Patient Profile not found.',
      });
    }

    res.send({ success: true });
  } catch (error) {
    console.log('Error in uploading profile pitcher', error);
  }
};

module.exports = { createPatientProfileController, getPatientProfileController, uploadProfilePitcher };
