const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  usertype: {
    type: String,
    required: [true, "Registarion type is required"],
  },
  fullname: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    require: true,
    default: "pending",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
