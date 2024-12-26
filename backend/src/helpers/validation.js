const validator = require("validator");

const userValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName) {
    throw new Error("First Name must be provided");
  } else if (!lastName) {
    throw new Error("Last name must be provided");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a String password");
  }
};

const organizationValidator = (req) => {
  const { email, password, name, description } = req.body;

  if (!name) {
    throw new Error("Organization Name is Required");
  } else if (!description) {
    throw new Error("Description is Required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  userValidation,
  organizationValidator,
};
