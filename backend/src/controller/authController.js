const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userValidation } = require("../utils/validation");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  userValidation(req);

  const { firstName, lastName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  if (newUser) {
    res.status(200).json({
      success: true,
      message: "User registered successfully!",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed to register user",
    });
  }
  res.status(201).json({ message: "User registered successfully!" });
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const exsistingUser = await User.findOne({
      email,
    });

    if (!exsistingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      exsistingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = await exsistingUser.generateToken();
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, logOutUser };
