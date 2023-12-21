const SpecialityModel = require('../models/SpecialityModel');
const MedicalSpecialty = require('../models/medicalSpecialty');

// Getting all medical specialties
const getAllMedicalSpecialties = async (req, res) => {
  try {
    // Retrieve all medical specialties from the database
    const medicalSpecialties = await SpecialityModel.find();

    return res.status(200).json({
      success: true,
      data: medicalSpecialties,
    });
  } catch (error) {
    console.error('Error getting medical specialties:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get medical specialties.',
      error: error.message,
    });
  }
};

// Creating a new medical specialty
const createMedicalSpecialty = async (req, res) => {
  try {
    // Extract the data from the request body
    const { name, description } = req.body;

    // Check if the medical specialty with the given name already exists
    const existingSpecialty = await MedicalSpecialty.findOne({ name });
    if (existingSpecialty) {
      return res.status(400).json({
        success: false,
        message: 'Medical specialty with this name already exists.',
      });
    }

    // Create a new medical specialty
    const newSpecialty = new MedicalSpecialty({
      name,
      description,
    });

    // Save the new medical specialty to the database
    const savedSpecialty = await newSpecialty.save();

    return res.status(201).json({
      success: true,
      data: savedSpecialty,
      message: 'Medical specialty created successfully.',
    });
  } catch (error) {
    console.error('Error creating medical specialty:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create medical specialty.',
      error: error.message,
    });
  }
};

module.exports = { getAllMedicalSpecialties, createMedicalSpecialty };
