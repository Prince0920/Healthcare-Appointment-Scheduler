const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

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
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server working ...........");
});

const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const patientProfileRoute = require("./routes/patient/profile");
const doctorProfileRoute = require("./routes/doctor/doctor");
const doctorAppointmentRoute = require("./routes/doctor/appointment");
const medicalSpecialtyRoute = require("./routes/medicalSpecialty");
const adminRoute = require("./routes/admin/adminRoutes");
const MyBookingRoute = require("./routes/patient/myBookingRoute");
const ReviewByPatient = require("./routes/patient/reviewByPatientRoute");
const PatientDetailRoute = require("./routes/patient/patientDetailRoute");
const StripePaymentRoute = require("./routes/paymentGateway/stripePaymentRoute");
const MyReviewRoute = require("./routes/doctor/myReview");
const NotificationRoute = require("./routes/notificationRoute");
const PaypalPaymentRoute = require("./routes/paymentGateway/paypalPaymentRoute");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hospital", hospitalRoutes);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/patient", patientProfileRoute);
app.use("/api/v1/doctor", doctorProfileRoute);
app.use("/api/v1/doctor", doctorAppointmentRoute);
app.use("/api/v1/medical-speciality", medicalSpecialtyRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/my-bookings", MyBookingRoute);
app.use("/api/v1/patient", PatientDetailRoute);
app.use("/api/v1/payment", StripePaymentRoute);
app.use("/api/v1/reviewByPatient", ReviewByPatient);
app.use("/api/v1/doctor", MyReviewRoute);
app.use("/api/v1/notifications", NotificationRoute);

app.use("/api/v1/payment/paypal", PaypalPaymentRoute);

//port
const port = process.env.PORT || 8080;
//listen port
const server = app.listen(port, () => {
  console.log(`server is running ${process.env.DEV_MODE} mode on port ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3101",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io...");

  socket.on("disconnect", () => {
    console.log("Some left the room");
  });

  socket.on("new notification", () => {
    console.log("I am in new notificatiopn");
    socket.broadcast.emit("send notification");
  });
});
