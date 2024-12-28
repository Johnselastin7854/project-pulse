const Organization = require("../model/organization");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { generateJWTToken } = require("../utils/generateJWTToken");

const login = async (req, res) => {
  const { email, password, type } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    let entity;

    if (type === "user") {
      entity = await User.findOne({ email });
    } else if (type === "organization") {
      entity = await Organization.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid type Specified" });
    }

    if (!entity) {
      return res.status(404).json({ message: `${type} not found` });
    }

    const isPasswordMatch = await bcrypt.compare(password, entity.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    generateJWTToken(res, entity?.name, entity?.role, entity?._id);
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: {
        ...entity._doc,
        password: null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { email, code, type } = req.body;

  if (!email || !code || !type) {
    return res.status(400).json({ message: "Invalid Request Data" });
  }

  try {
    let entity;
    if (type === "organization") {
      entity = await Organization.findOne({ email });
    } else if (type === "user") {
      entity = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid type Specified" });
    }

    if (!entity) {
      return res.status(404).json({ message: `Invalid ${type}` });
    }

    if (entity.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    if (entity?.isVerified) {
      return res.status(400).json({ message: `${type} already verified` });
    }

    if (entity.verificationToken !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    entity.isVerified = true;
    entity.verificationToken = null;
    entity.VerficationTokenExpires = null;
    await entity.save();
    res.status(200).json({ message: `${type} email verified successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, verifyEmail, logOut };
