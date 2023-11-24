const express = require("express");

//router object
const router = express.Router();

//middleware
const authMiddleware = require("../config/middlewares/authMiddleware");

// import controller
const medicalSpecialtyController = require("../controllers/medicalSpecialty");


//get all hospitals
router.get("/", medicalSpecialtyController.getAllMedicalSpecialties);

router.post("/", medicalSpecialtyController.createMedicalSpecialty);

module.exports = router;
