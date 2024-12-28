const Organization = require("../model/organization");
const User = require("../model/user");

const checkEmailInUser = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser;
};

const checkEmailInOrganization = async (email) => {
  const existingOrganization = await Organization.findOne({ email });
  return existingOrganization;
};

module.exports = { checkEmailInUser, checkEmailInOrganization };
