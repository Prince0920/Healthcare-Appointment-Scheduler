const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const hospitalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    establishmentDetails: {
      hospitalName: {
        type: String,
        required: true,
      },
      ownerName: {
        type: String,
        required: true,
      },
    },
    address: {
      addressLineOne: {
        type: String,
        required: true,
      },
      village: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      telephoneNumber: {
        type: String,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: {
        type: String,
      },
    },
    about: {
      aboutHospital: {
        type: String,
      },
    },
    humanResources: {
      totalEmployees: {
        type: Number,
      },
      totalDoctors: {
        type: Number,
      },
    },
    infrastructureDetails: {
      totalArea: {
        type: String,
      },
      constructedArea: {
        type: String,
      },
    },
    status: {
      type: String,
      default: "pending", // Default value of "pending"
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields to your schema
  }
);

const hospitalModel = mongoose.model("hospitals", hospitalSchema);
module.exports = hospitalModel;
