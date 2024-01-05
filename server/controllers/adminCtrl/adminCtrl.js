const userModel = require('../../models/userModels');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SpecialityAreaModel = require('../../models/specialityarea');
const uploadImageToCloudnary = require('../../utils/uploadImageToCloudnary');

//get admin profile info
const getadminProfileInfo = async (req, res) => {
  console.log('get user id', req.body.userId);
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    //  console.log('user',user);
    if (!user) {
      return res
        .status(200)
        .send({ message: 'User not found', success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: 'auth error', success: false });
  }
};

const adminUpdateProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    //check that user exists or not
    const userData = await userModel.findOne({ _id: userId });
    // console.log(userData);

    if (!userData) {
      res.status(400).send({
        success: false,
        message: 'User not available',
      });
    }

    //update hospital fullname
    userData.set({ fullname: req.body.primaryInfo.fullname });
    userData.set({ email: req.body.primaryInfo.email });
    //save user data(as hospita) with ful name
    await userData.save();

    res.status(201).send({
      success: true,
      message: 'Profile updated successfully ',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Register ${error.message}`,
    });
  }
};

//get admin profile info
const getallUsers = async (req, res) => {
  // console.log("get user id", req.body.userId);
  try {
    const user = await userModel.find({});
    if (!user) {
      return res
        .status(200)
        .send({ message: 'User not available', success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: 'auth error', success: false });
  }
};

const changeAccountStatus = async (req, res) => {
  try {
    const { recordUserId, status } = req.body;
    console.log(status);
    const user = await userModel.findOne({ _id: recordUserId });
    //user.status = status === 'approved' ? true : false;
    user.status = status;
    await user.save();

    res.status(201).send({
      success: true,
      message: 'Account status updated',
      //data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: 'Error in  acount status',
      error: error,
    });
  }
};

//upload profile picture
const uploadProfilePitcher = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log('uploadProfilePitcher', userId);
    // Check if user's data is already exists
    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    let myCloud;
    if (req.file) {
      myCloud = await uploadImageToCloudnary(req.file?.path);
    }
    const saved_image_url = myCloud.secure_url;

    let adminProfile = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        profileImage: saved_image_url,
      }
    );

    if (!adminProfile) {
      return res.status(404).json({
        success: false,
        message: 'Doctor Profile not found.',
      });
    }

    res.send({ success: true });
  } catch (error) {
    console.log('Error in uploading profile pitcher', error);
  }
};

module.exports = {
  getadminProfileInfo,
  adminUpdateProfile,
  getallUsers,
  changeAccountStatus,
  uploadProfilePitcher
};
