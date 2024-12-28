const express = require("express");
const orgRouter = express.Router();
const {
  registerOrganization,
} = require("../controller/organizationController");
const uploadMiddleware = require("../middleware/uploadMiddelware");
const { verifyEmail } = require("../controller/authController");

orgRouter.post(
  "/register",
  uploadMiddleware.single("file"),
  registerOrganization
);
orgRouter.post("/verify-email", verifyEmail);

module.exports = orgRouter;
