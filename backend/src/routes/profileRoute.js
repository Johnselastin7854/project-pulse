const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware.js/userAuth");
const { changePassword } = require("../controller/profileController");

profileRouter.patch("/change-password", userAuth, changePassword);

module.exports = profileRouter;
