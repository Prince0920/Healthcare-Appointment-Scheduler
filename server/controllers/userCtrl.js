const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // delete req.body.confirm_password;

    const newUser = new userModel(req.body);
    await newUser.save();

    return res.send({
      success: true,
      message: "Register successfully done!",
    });
  } catch (error) {
    //console.log(error);
    return res.status(200).send({
      success: false,
      message: `Register ${error.message}`,
    });
  }
};

//login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User does not exists",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    //console.log("is matched - " + isMatch);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .send({ message: "Login Successfull", success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      message: `Error in Login CTRL ${error.message}`,
      success: false,
    });
  }
};

//get user info
const authController = async (req, res) => {
  console.log("get user id", req.body.userId);
  // res.status(500).send({message:'hello',success:true});
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    //  console.log('user',user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
        // data: {
        //   name: user.name,
        //   email: user.email,
        //   isAdmin: user.isAdmin,
        // },
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "auth error", success: false });
  }
};

module.exports = { loginController, registerController ,authController};
