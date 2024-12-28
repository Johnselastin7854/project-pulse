const bcrypt = require("bcrypt");
const Organization = require("../model/organization");
const User = require("../model/user");
const { sendOrgVerificationEmail } = require("../helpers/email");
const generateVerificationToken = require("../helpers/emailVerificationToken");
const { generateJWTToken } = require("../utils/generateJWTToken");
const { organizationValidator } = require("../helpers/validation");
const uploadToCloudinary = require("../helpers/uploadToCloudinary");
const {
  checkEmailInUser,
  checkEmailInOrganization,
} = require("../helpers/emailCheckHelper");

const registerOrganization = async (req, res) => {
  try {
    organizationValidator(req);
    const { name, email, password, description } = req.body;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "Logo is required" });
    }

    const existingUser = await checkEmailInUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingOrganization = await checkEmailInOrganization(email);
    if (existingOrganization) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingOrganization?.name === name) {
      return res
        .status(400)
        .json({ message: "Organization name already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verifyEmailToken = generateVerificationToken();

    const { url, publicId } = await uploadToCloudinary(file.path);

    const newOrganization = new Organization({
      name,
      email,
      password: hashedPassword,
      photoUrl: url,
      publicId,
      description,
      role: "ADMIN",
      verificationToken: verifyEmailToken,
      verificationTokenExpires: Date.now() + 30 * 60 * 1000,
    });

    await newOrganization.save();
    generateJWTToken(
      res,
      newOrganization?.name,
      newOrganization?.role,
      newOrganization?.email
    );
    await sendOrgVerificationEmail(
      newOrganization.email,
      verifyEmailToken,
      url
    );
    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: {
        ...newOrganization._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

module.exports = {
  registerOrganization,
};
