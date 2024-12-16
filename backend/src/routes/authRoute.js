const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
} = require("../controller/authController");

authRouter.post("/signup", registerUser);
authRouter.post("/signin", loginUser);
authRouter.post("/logout", logOutUser);

module.exports = authRouter;
