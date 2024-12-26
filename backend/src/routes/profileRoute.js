const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const { changePassword } = require("../controller/profileController");

profileRouter.patch("/change-password", userAuth, changePassword);

module.exports = profileRouter;
