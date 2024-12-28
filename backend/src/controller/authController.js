const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userValidation } = require("../helpers/validation");
const generateVerificationToken = require("../helpers/emailVerificationToken");
const {
  checkEmailInUser,
  checkEmailInOrganization,
} = require("../helpers/emailCheckHelper");
const { generateJWTToken } = require("../utils/generateJWTToken");
const { sendUserVerificationEmail } = require("../helpers/email");

const registerUser = async (req, res) => {
  try {
    userValidation(req);

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await checkEmailInUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingOrganization = await checkEmailInOrganization(email);
    if (existingOrganization) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verifyEmailToken = generateVerificationToken();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: verifyEmailToken,
      verificationTokenExpires: Date.now() + 30 * 60 * 1000,
    });
    await newUser.save();
    generateJWTToken(res, newUser?.name, newUser?.role, newUser?.email);
    await sendUserVerificationEmail(newUser.email, verifyEmailToken, url);
    if (newUser) {
      res.status(200).json({
        success: true,
        message: "User registered successfully!",
        data: {
          ...newUser._doc,
          password: undefined,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to register user",
      });
    }
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
