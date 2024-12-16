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

module.exports = {
  userValidation,
};
