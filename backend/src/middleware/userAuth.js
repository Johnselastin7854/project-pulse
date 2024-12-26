const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies();

    if (!token) {
      throw new Error("No token found, authorization denied");
    }

    const decoedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { _id } = decoedToken;

    const user = await User.findOne({ _id }).select("-password");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send("Error: " + err.message);
  }
};

module.exports = userAuth;
