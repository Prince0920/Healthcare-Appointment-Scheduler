const mongoose = require('mongoose');

const medicalSpecialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const MedicalSpecialty = mongoose.model('MedicalSpecialty', medicalSpecialtySchema);

module.exports = MedicalSpecialty;
