const mongoose = require('mongoose');
const SpecialityAreaModel = require('../models/specialityarea');

const SpecialitySchema = new mongoose.Schema(
  {
    specialityArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SpecialityAreaModel', // Use the model name, not the variable name
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SpecialityModel = mongoose.model('Speciality', SpecialitySchema); // Adjust the model name as needed

module.exports = SpecialityModel;
