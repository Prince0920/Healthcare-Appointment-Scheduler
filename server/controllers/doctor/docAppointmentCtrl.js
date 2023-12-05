const userModel = require('../../models/userModels');
const doctorAppoinmentModel = require('../../models/doctorAppointment');
const doctorProfileModel = require('../../models/doctorProfile');
const PatientProfile = require('../../models/patientProfile');
const getDoctorAppointments = async (req, res) => {
  const { userId } = req.body;
  try {
    // get user doctor profile id by user id

    const doctorProfile = await doctorProfileModel.findOne({ userId: userId });

    //console.log('doctor profile  ' + doctorProfile);
    if (doctorProfile) {
      const docProfileId = doctorProfile._id;
      // console.log('doctor profile id is ' + docProfileId);
      // const alldocAppointmets = await doctorAppoinmentModel
      //   .find({
      //     doctorProfileId: docProfileId,
      //   })
      //   .populate('patientDetailId');

      const alldocAppointmets = await doctorAppoinmentModel
        .find({
          doctorProfileId: docProfileId,
        })
        .populate({
          path: 'patientDetailId',
          populate: {
            path: 'userId',
            model: 'User',
          },
        });

      // const appointmentsWithInfo = [];

      if (alldocAppointmets) {
        // console.log('testt');

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

        console.log('alldocAppointmets', alldocAppointmets);
        //console.log('doctor data ' + alldocAppointmets);
        if (alldocAppointmets) {
          res.status(200).send({
            success: true,
            data: alldocAppointmets,
            message: 'All appointments fetched',
          });
        } else {
          res.status(200).send({
            success: true,
            message: 'No record available',
          });
        }
      }
    } else {
      res.status(200).send({
        success: true,
        message: 'something went wrong ',
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

module.exports = { getDoctorAppointments, docUpdateAppoStatusCtrl };
