const User = require("../model/user");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const loggedInUser = req.user;

    const isValidPrevPassword = await loggedInUser.validatePassword(
      newPassword
    );

    if (!isValidPrevPassword) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { changePassword };
