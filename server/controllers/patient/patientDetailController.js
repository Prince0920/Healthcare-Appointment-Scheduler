const PatientProfile = require('../../models/patientProfile');
const PatientDetail = require('../../models/patientDetail');

const addPatient = async (req, res) => {
  try {
    const { patientName, age, gender, userId } = req.body;

    // Validate request data
    if (!patientName || !age || !gender || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete request data. Please provide patientName, age, gender, and userId.',
      });
    }

    // Create a new patient record
    const patientData = await PatientDetail.create({
      userId,
      patientName,
      age,
      gender,
    });

    return res.status(201).json({
      success: true,
      data: patientData,
      message: 'Patient profile created successfully.',
    });
  } catch (error) {
    console.error('Error adding patient profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add patient profile.',
      error: error.message,
    });
  }
};

module.exports = {
  addPatient,
  // Add other functions as needed
};