const express = require("express");

//router object
const router = express.Router();

//middleware
const authMiddleware = require("../config/middlewares/authMiddleware");

// import controller
const hospitalCtrl = require("../controllers/hospitalCtrl");

//routes
router.post(
  "/hospitalUpdateProfile",
  authMiddleware,
  hospitalCtrl.hospitalUpdateProfile
);

module.exports = router;
