const express = require("express");
const authRouter = express.Router();
const { registerUser } = require("../controller/authController");
const {
  login,
  verifyEmail,
  logOut,
} = require("../controller/commonController");

authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/sign-in", login);
authRouter.post("/logout", logOut);

module.exports = authRouter;
