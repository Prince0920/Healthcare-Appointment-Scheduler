const hospitalModel = require("../models/hospitalModels");
const userModel = require("../models/userModels");

const hospitalUpdateProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    //check that user exists or not
    const userData = await userModel.findOne({ _id: userId });
    // console.log(userData);

    if (!userData) {
      res.status(400).send({
        success: false,
        message: "User not available",
      });
    }

    console.log(req.body.establishmentDetails.hospitalName);

    //update hospital fullname
    userData.set({ fullname: req.body.establishmentDetails.hospitalName });
    //save user data(as hospita) with ful name
    await userData.save();

    //check that hospita profile is already exists or not
    let hospitalProfileInfo = await hospitalModel.findOne({ userId });

    if (!hospitalProfileInfo) {
      //if profile not exists then insert it
      hospitalProfileInfo = new hospitalModel(req.body);
      //console.log("no  hospita profile does not exists");
    } else {
      hospitalProfileInfo.set(req.body);
      //console.log("Yes hospita profile exists");
    }

    await hospitalProfileInfo.save();

    res.status(201).send({
      success: true,
      message: "Hospital profile updated successfully ",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Register ${error.message}`,
    });
  }
};

module.exports = { hospitalUpdateProfile };
