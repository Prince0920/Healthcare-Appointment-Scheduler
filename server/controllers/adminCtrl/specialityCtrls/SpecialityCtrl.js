const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SpecialityAreaModel = require('../../../models/specialityarea');

//add speciality type
const addSpecialityTypeCtrl = async (req, res) => {
  const specialityTypeName = req.body.specialityArea.name;
  try {
    console.log(specialityTypeName);
    if (specialityTypeName) {
      const newSpecialityArea = new SpecialityAreaModel({
        name: specialityTypeName,
      });
      // console.log('New Speciality Area Object:', newSpecialityArea);

      await newSpecialityArea.save();
      res.status(200).send({
        success: true,
        message: 'Speciality Area added successfully',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: 'Error in add speciality Area ' + error,
      error: error,
    });
  }
};

//get all speciality areas
const getSpecialityTypeCtrl = async (req, res) => {
  try {
    const specialityAreas = await SpecialityAreaModel.find({});
    if (specialityAreas) {
      res.status(200).send({
        success: true,
        data: specialityAreas,
        message: 'Records fetch successfully',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in fetch speciality Areas:' + error,
      error: error,
    });
  }
};

module.exports = {
  addSpecialityTypeCtrl,
  getSpecialityTypeCtrl,
};
