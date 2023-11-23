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

//get hospital info
router.get("/hosProfileInfo", authMiddleware, hospitalCtrl.hosProfileInfo);

module.exports = router;
