const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userValidation } = require("../utils/validation");

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
  res.status(201).json({ message: "User registered successfully!" });
  try {
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser };
