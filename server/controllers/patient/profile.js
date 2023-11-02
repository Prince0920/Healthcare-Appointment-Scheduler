const PatientProfile = require('../../models/patientProfile');

// Patient Profile create
const createPatientProfileController = async (req, res) => {
  try {
    const { userId } = req.body;

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

    const profileData = await PatientProfile.findOne({ userId });

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: profileData,
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

module.exports = { createPatientProfileController, getPatientProfileController };
