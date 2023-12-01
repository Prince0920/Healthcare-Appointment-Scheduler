const mongoose = require('mongoose');

const SpecialitySchema = new mongoose.Schema(
  {
    specialityArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SpecialityAreaModel',
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

const SpecialityModel = mongoose.model('speciality', SpecialitySchema);

module.exports = SpecialityModel;
