const userModel = require('../../models/userModels');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
    //user.status = status === 'approved' ? true : 'approved';
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

module.exports = {
  getadminProfileInfo,
  adminUpdateProfile,
  getallUsers,
  changeAccountStatus,
};
