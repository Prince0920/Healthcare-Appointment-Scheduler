const DoctorAppointment = require('../../models/doctorAppointment');
const DoctorProfile = require('../../models/doctorProfile');
const PatientProfile = require('../../models/patientProfile');
const userModel = require('../../models/userModels');

// Doctor Appointment create
const bookAppointmentWithDoctor = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingAppointment = await DoctorAppointment.findOne({
      patientProfileId: userId,
      doctorProfileId: req.body.doctorProfileId,
      status: 'scheduled',
    });

    if (existingAppointment) {
      return res.status(200).json({
        success: false,
        message:
          'Cannot book a new appointment. There is a pending appointment with the same doctor.',
      });
    }

    await DoctorAppointment({
      patientProfileId: userId,
      doctorProfileId: req.body.doctorProfileId,
      date: req.body.date,
      status: 'scheduled',
    }).save();

    return res.status(201).json({
      success: true,
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
    let doctorData = await DoctorProfile.find({
      medicalSpecialty: req.body.medicalSpecialty,
    }).populate('userId');

    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: 'Not avaliable.',
      });
    }
    const formattedDoctorData = doctorData.map(doctor => {
      const { userId } = doctor;

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
        medicalSpecialty: doctor.medicalSpecialty,
        workingHours: doctor.workingHours,
        about: doctor.about,
        review: doctor.review,
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