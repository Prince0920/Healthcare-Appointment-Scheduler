const userModel = require('../../models/userModels');
const doctorAppoinmentModel = require('../../models/doctorAppointment');
const doctorProfileModel = require('../../models/doctorProfile');
const PatientProfile = require('../../models/patientProfile');
const PatientDetail = require('../../models/patientDetail');
const getDoctorAppointments = async (req, res) => {
  const { userId } = req.body;
  const { filterStatus, search } = req.query;

  //console.log('filterstatus', filterStatus);
  //console.log('search', search);
  try {
    // get user doctor profile id by user id
    const doctorProfile = await doctorProfileModel.findOne({ userId: userId });

    const query = {};

    if (doctorProfile) {
      const docProfileId = doctorProfile._id;

      let query = { doctorProfileId: docProfileId };

      // Add status condition only if filterStatus is not blank
      if (filterStatus !== undefined && filterStatus !== '') {
        query.status = filterStatus;
      }
      if (search) {
        console.log('search for', search);
        query.$or = [
          {
            'patientDetailId.patientName': { $regex: new RegExp(search, 'i') },
          },
        ];
      }

      // console.log('Final Query:', query);

      const alldocAppointments = await doctorAppoinmentModel
        .find(query)
        .populate('patientDetailId')
        .populate('userId');

      if (alldocAppointments && alldocAppointments.length > 0) {
        res.status(200).send({
          success: true,
          data: alldocAppointments,
          message: 'All appointments fetched',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'No records available',
        });
      }
    } else {
      res.status(200).send({
        success: true,
        message: 'Something went wrong',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Appointment fetch error ${error}`,
    });
  }
};

//update appointment status by doctor
const docUpdateAppoStatusCtrl = async (req, res) => {
  const { userId } = req.body;
  console.log('user id is ', userId);
  //const { status, comment } = req.body.appoUpdateStInfo;
  console.log('received info is', req.body.appoUpdateStInfo);
  console.log('appointment id is ', req.body.appoId);

  try {
    const appoInfo = await doctorAppoinmentModel.findOne({
      _id: req.body.appoId,
    });

    console.log('appointment info', appoInfo);

    if (appoInfo) {
      appoInfo.set({
        status: req.body.appoUpdateStInfo.status,
        message: req.body.appoUpdateStInfo.comment,
      });
      await appoInfo.save();
      res.status(200).send({
        success: true,
        data: appoInfo,
        message: 'Status updated successfully',
      });
    } else {
      res.status(400).send({
        success: false,
        message: `Appointment info not available`,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Appointment fetch error ${error}`,
    });
  }
};

const ifuseloop = () => {
  // Use Promise.all to await all asynchronous operations in the map
  // const appointmentsWithInfo = await Promise.all(
  //   alldocAppointmets.map(async (alldocAppointmet) => {
  //     const patientProfileId = alldocAppointmet.patientProfileId;
  //     // Use await to wait for the userModel.findOne to complete
  //     const patientInfo = await userModel.findOne({
  //       _id: patientProfileId,
  //     });
  //     //console.log(patientInfo);
  //     // Add patientInfo to the alldocAppointmet object
  //     // alldocAppointmet.patientInfo = patientInfo;
  //     let tempObj = {
  //       ...alldocAppointmet.toObject(),
  //       patientInfo: patientInfo,
  //     };
  //     // console.log('alllllll', tempObj);
  //     return tempObj;
  //   })
  // );
};

module.exports = { getDoctorAppointments, docUpdateAppoStatusCtrl };
