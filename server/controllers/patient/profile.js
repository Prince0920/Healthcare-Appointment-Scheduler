const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const PatientProfile = require('../../models/patientProfile');
const mongoose = require('mongoose');

//Patient Profile create
const createPatientProfileController = async (req, res) => {
  try {
    const profileData = await PatientProfile.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      {
        upsert: true,
      }
    );
    console.log('profileData', profileData);
    return res.send({
      success: true,
      message: 'Profile Updated Successfully!',
    });
  } catch (error) {
    //console.log(error);
    return res.status(200).send({
      success: false,
      message: `Register ${error.message}`,
    });
  }
};

//Patient Profile get
const getPatientProfileController = async (req, res) => {
  try {
    const profileData = await PatientProfile.findOne({ userId: req.body.userId });
    console.log('profileData', profileData);
    return res.send({
      success: true,
      data: profileData,
    });
  } catch (error) {
    //console.log(error);
    return res.status(200).send({
      success: false,
      message: `Register ${error.message}`,
    });
  }
};
module.exports = { createPatientProfileController, getPatientProfileController };
