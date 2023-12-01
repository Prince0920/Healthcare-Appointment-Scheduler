const mongoose = require('mongoose');

const SpecialityAreaSchema = new mongoose.Schema(
  {
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

const SpecialityAreaModel = mongoose.model(
  'specialityarea',
  SpecialityAreaSchema
);
module.exports = SpecialityAreaModel;
