const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SpecialityAreaModel = require('../../../models/specialityarea');

const SpecialityModel = require('../../../models/SpecialityModel');

//add speciality type
const addSpecialityTypeCtrl = async (req, res) => {
  const specialityTypeName = req.body.specialityArea.name;
  try {
    // console.log(specialityTypeName);
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
        message: 'Specialities area  fetched successfully.',
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

//get all speciality
const getSpecialityCtrl = async (req, res) => {
  try {
    // const specialities = await SpecialityModel.find({}).populate(
    //   'specialityAreaId'
    // );
    const specialities = await SpecialityModel.find({}).populate(
      'specialityAreaId'
    );

    console.log('specialities', specialities);
    if (specialities) {
      res.status(200).send({
        success: true,
        data: specialities,
        message: 'Specialit Records fetch successfully',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in fetch speciality:' + error,
      error: error,
    });
  }
};

//add speciality
const addSpecialityCtrl = async (req, res) => {
  try {
    const newSpeciality = new SpecialityModel({
      specialityAreaId: req.body.speciality.speciality_area,
      name: req.body.speciality.name,
    });

    await newSpeciality.save();

    res.status(200).send({
      success: true,
      message: 'Speciality  added successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in add speciality :' + error,
      error: error,
    });
  }
};

//update speciality area staus
const updateSpeAreaStaCtrl = async (req, res) => {
  const { recordSpeAreaId, status } = req.body;
  //console.log('Speciality area status ', req.body.status);
  try {
    const specialAreaDetail = await SpecialityAreaModel.findOne({
      _id: recordSpeAreaId,
    });
    specialAreaDetail.status = status;
    await specialAreaDetail.save();

    res.status(200).send({
      success: true,
      message: 'Status updated successsfully.',
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: 'Error in status update:' + error,
    });
    console.log(error);
  }
};

//update speciality area staus
const updateSpeStaCtrl = async (req, res) => {
  const { recordSpeId, status } = req.body;
  console.log('recordSpeId ', recordSpeId);
  console.log('Speciality area status ', req.body.status);
  try {
    const specialAreaDetail = await SpecialityModel.findOne({
      _id: recordSpeId,
    });
    specialAreaDetail.status = status;
    await specialAreaDetail.save();

    res.status(200).send({
      success: true,
      message: 'Status updated successsfully.',
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: 'Error in status update:' + error,
    });
    console.log(error);
  }
};

module.exports = {
  addSpecialityTypeCtrl,
  getSpecialityTypeCtrl,
  addSpecialityCtrl,
  getSpecialityCtrl,
  updateSpeAreaStaCtrl,
  updateSpeStaCtrl,
};
