const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.send({
        message: "User already signed up!",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 15);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User registration successfull finished!",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//login
router.post("/sign-in", async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      return res.send({
        message: "User does not exist!",
        success: false,
        data: null,
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existUser.password
    );

    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password!",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign(
      {
        userId: existUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.send({
      message: "User logged in successfully!",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// get user by id
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User fetched successfull!",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

module.exports = router;
