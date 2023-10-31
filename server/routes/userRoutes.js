const express = require("express");

//router object
const router = express.Router();
const userController = require("../controllers/userCtrl");
const authMiddleware = require("../config/middlewares/authMiddleware");

//Login || post
router.post("/login", userController.loginController);

//register || post
router.post("/register", userController.registerController);

//get user
router.post('/getUserData',authMiddleware,userController.authController)

module.exports = router;
