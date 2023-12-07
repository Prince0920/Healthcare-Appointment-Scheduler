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

const Specialityarea = mongoose.model('Specialityarea', SpecialityAreaSchema);
module.exports = Specialityarea;
