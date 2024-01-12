const SpecialityModel = require('../../models/SpecialityModel');
const DoctorAppointment = require('../../models/doctorAppointment');
const DoctorProfile = require('../../models/doctorProfile');
const PatientDetail = require('../../models/patientDetail');
const PatientProfile = require('../../models/patientProfile');
const userModel = require('../../models/userModels');
const { sendMail } = require('../../utils/emailService');
const patientDetails = require('../../models/patientDetail');
const sendNotification = require('../../utils/sendNotification');

// Doctor Appointment create
const bookAppointmentWithDoctor = async (req, res) => {
  try {
    const {
      userId,
      patientDetailId,
      doctorProfileId,
      appointmentDate,
      reasonOfAppointment,
    } = req.body;

    const data = await DoctorAppointment({
      userId,
      patientDetailId,
      doctorProfileId,
      appointmentDate,
      reasonOfAppointment,
      status: 'scheduled',
    }).save();

    const getPatientInfo = await patientDetails.findOne({
      _id: patientDetailId,
    });
    console.log('getPatientInof', getPatientInfo);
    const patientName = getPatientInfo.patientName;
    const age = getPatientInfo.age;
    const gender = getPatientInfo.gender;
    const mailTo = 'deepaksharma8820@gmail.com';
    //appoint mail info to the doctor
    const mailInfo = {
      mailFor: 'mailToDocAppintment',
      mailTo: mailTo,
      patientName: patientName,
      date: appointmentDate,
      age: age,
      gender: gender,
      reasonOfAppointment: reasonOfAppointment,
    };
    await sendMail(mailInfo);

    // Sending Notification Starts

    const senderDetail = await PatientDetail.findOne({
      _id: patientDetailId,
    });

    const recevierDetail = await DoctorProfile.findOne({
      _id: doctorProfileId,
    });

    sendNotification(
      senderDetail.userId,
      recevierDetail.userId,
      `New appointment request from ${senderDetail.patientName}`
    );
    // Sending Notification End
    return res.status(201).json({
      success: true,
      data: data,
      message: 'Appointment Successfully Booked With Doctor!',
    });
  } catch (error) {
    console.error('Error creating/updating patient profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create/update patient profile.',
      error: error.message,
    });
  }
};

const searchDoctor = async (req, res) => {
  try {
    let specilityData = {};

    // If user selected the specility then getting specility from SpecialityModel for find id for specility.
    if (req.body?.medicalSpecialty) {
      specilityData = await SpecialityModel.findOne({
        name: req.body.medicalSpecialty,
      });
    }

    let filter_cond_dp = {};
    // If user does not select any value the fetch all entries.
    if (Object.keys(specilityData).length !== 0) {
      filter_cond_dp = {
        specilityId: specilityData?._id,
      };
    }
    let doctorData = await DoctorProfile.find(filter_cond_dp)
      .populate('userId')
      .populate('specilityId');
    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: 'Not avaliable.',
      });
    }
    const formattedDoctorData = doctorData.map((doctor) => {
      const { userId } = doctor;
      const { specilityId } = doctor;
      return {
        doctorProfileId: doctor._id,
        fullName: userId.fullname,
        email: userId.email,
        usertype: userId.usertype,
        address: doctor.address,
        gender: doctor.gender,
        education: doctor.education,
        phone: doctor.phone,
        experience: doctor.experience,
        medicalSpecialty: specilityId.name,
        workingHours: doctor.workingHours,
        about: doctor.about,
        review: doctor.review,
        profileImage: doctor.profileImage,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedDoctorData,
    });
  } catch (error) {
    console.error('Error getting :', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get doctors search result.',
      error: error.message,
    });
  }
};

module.exports = {
  bookAppointmentWithDoctor,
  searchDoctor,
};
