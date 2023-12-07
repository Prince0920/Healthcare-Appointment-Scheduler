const mongoose = require('mongoose');

const SpecialitySchema = new mongoose.Schema(
  {
    specialityAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialityarea', // Use the model name, not the variable name
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const SpecialityModel = mongoose.model('Speciality', SpecialitySchema); // Adjust the model name as needed

module.exports = SpecialityModel;
