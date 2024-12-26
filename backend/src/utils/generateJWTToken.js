const jwt = require("jsonwebtoken");
const generateJWTToken = (res, name, role, email) => {
  const tokenData = {
    name,
    role,
    email,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = { generateJWTToken };
