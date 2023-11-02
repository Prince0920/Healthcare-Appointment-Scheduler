const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const PatientProfile = require('../../models/patientProfile');
const mongoose = require('mongoose')

//Patient Profile managment
const patientProfileController = async (req, res) => {
  try {
    // const existingUser = await userModel.findOne({ email: req.body.email });
    // if (existingUser) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "User already exists",
    //   });
    // }
    console.log("Req.body", req.body);
    const profileData = await PatientProfile.findOneAndUpdate(
      { userId: (req.body.userId) },
      req.body,
      {
        upsert: true,
      }
    );
    console.log("profileData", profileData)
    // const password = req.body.password;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // req.body.password = hashedPassword;
    // // delete req.body.confirm_password;

    // const newUser = new userModel(req.body);
    // await newUser.save();

    return res.send({
      success: true,
      message: 'Profile Created!',
    });
  } catch (error) {
    //console.log(error);
    return res.status(200).send({
      success: false,
      message: `Register ${error.message}`,
    });
  }
};

module.exports = { patientProfileController };
