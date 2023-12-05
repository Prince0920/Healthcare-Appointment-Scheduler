const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SpecialityAreaModel = require('../../../models/specialityarea');

const SpecialityModel = require('../../../models/SpecialityModel');

//add speciality type
const addUpdateSpecialityTypeCtrl = async (req, res) => {
  const specialityTypeName = req.body.specialityArea.name;
  const currSpeAreaId = req.body.currSpeAreaId;
  try {
    // console.log(specialityTypeName);
    if (specialityTypeName) {
      if (currSpeAreaId != '') {
        const specialAreaInfo = await SpecialityAreaModel.findOne({
          _id: currSpeAreaId,
        });
        //console.log(specialityTypeName);
        // console.log(specialAreaInfo);
        specialAreaInfo.name = specialityTypeName;
        await specialAreaInfo.save();

        res.status(200).send({
          success: true,
          message: 'Name updated successfully',
        });
      } else {
        const newSpecialityArea = new SpecialityAreaModel({
          name: specialityTypeName,
        });
        // console.log('New Speciality Area Object:', newSpecialityArea);

        await newSpecialityArea.save();
        res.status(200).send({
          success: true,
          message: 'Added successfully',
        });
      }
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
const addUpdateSpecialityCtrl = async (req, res) => {
  try {
    currSpeId = req.body.currSpeId;
    const specilityName = eq.body.speciality.name;

    if (currSpeId != '') {
      const specialInfo = await SpecialityModel.findOne({
        _id: currSpeAreaId,
      });
      //console.log(specialityTypeName);
      // console.log(specialAreaInfo);
      specialInfo.specialityAreaId = req.body.speciality.speciality_area;
      specialInfo.name = specilityName;
      await specialInfo.save();

      res.status(200).send({
        success: true,
        message: 'Name updated successfully',
      });
    } else {
      const newSpeciality = new SpecialityModel({
        specialityAreaId: req.body.speciality.speciality_area,
        name: specilityName,
      });

      await newSpeciality.save();

      res.status(200).send({
        success: true,
        message: 'Speciality  added successfully.',
      });
    }
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
  addUpdateSpecialityTypeCtrl,
  getSpecialityTypeCtrl,
  addUpdateSpecialityCtrl,
  getSpecialityCtrl,
  updateSpeAreaStaCtrl,
  updateSpeStaCtrl,
};
