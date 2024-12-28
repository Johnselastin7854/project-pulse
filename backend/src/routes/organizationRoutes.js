const express = require("express");
const orgRouter = express.Router();
const {
  registerOrganization,
} = require("../controller/organizationController");
const uploadMiddleware = require("../middleware/uploadMiddelware");
const {
  login: OrganizationLogin,
  verifyEmail: verifyOrganizationEmail,
  logOut: logOutOrganization,
} = require("../controller/commonController");

orgRouter.post(
  "/register",
  uploadMiddleware.single("file"),
  registerOrganization
);
orgRouter.post("/sign-in", OrganizationLogin);
orgRouter.post("/verify-email", verifyOrganizationEmail);
orgRouter.post("/logout", logOutOrganization);

module.exports = orgRouter;
