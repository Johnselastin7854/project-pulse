const express = require("express");
const orgRouter = express.Router();
const {
  registerOrganization,
} = require("../controller/organizationController");
const uploadMiddleware = require("../middleware/uploadMiddelware");

orgRouter.post(
  "/register",
  uploadMiddleware.single("file"),
  registerOrganization
);

module.exports = orgRouter;
