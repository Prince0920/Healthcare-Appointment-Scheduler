const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

//res object
const app = express();

//config .env
dotenv.config();

//import db
connectDB();

//use cors
app.use(cors());

//middleware
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Server working ...........');
});

const userRoutes = require('./routes/userRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const patientProfileRoute = require('./routes/patient/profile');
const doctorProfileRoute = require('./routes/doctor/doctor');
const doctorAppointmentRoute = require('./routes/doctor/appointment');
const medicalSpecialtyRoute = require('./routes/medicalSpecialty');
const adminRoute = require('./routes/admin/adminRoutes');
const MyBookingRoute = require('./routes/patient/myBookingRoute');
const PatientDetailRoute = require('./routes/patient/patientDetailRoute');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/hospital', hospitalRoutes);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/patient', patientProfileRoute);
app.use('/api/v1/doctor', doctorProfileRoute);
app.use('/api/v1/doctor', doctorAppointmentRoute);
app.use('/api/v1/medical-speciality', medicalSpecialtyRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/my-bookings', MyBookingRoute);
app.use('/api/v1/patient', PatientDetailRoute);

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(`server is running ${process.env.DEV_MODE} mode on port ${port}`);
});
