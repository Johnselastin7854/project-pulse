const User = require("../model/user");
const bcrypt = require("bcrypt");
import { userValidation } from "../utils/validation";

const registerUser = async (req, res) => {
  userValidation(req);

  const { firstName, lastName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
  } catch (error) {
    console.error(error);
  }
};
