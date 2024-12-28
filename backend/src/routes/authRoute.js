const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  verifyEmail,
} = require("../controller/authController");

authRouter.post("/signup", registerUser);
authRouter.post("/signin", loginUser);
authRouter.post("/logout", logOutUser);
authRouter.post("/verify-email", verifyEmail);

module.exports = authRouter;
