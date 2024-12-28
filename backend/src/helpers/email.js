const { verifyEmailTemplate } = require("./templates");
const transporter = require("../config/nodemailerConfig");

const sendOrgVerificationEmail = async (email, verificationToken, url) => {
  try {
    await transporter.sendMail({
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: "Verify your organisation email",
      html: verifyEmailTemplate
        .replace("{publicPath}", url)
        .replace("{verificationToken}", verificationToken),
    });
  } catch (error) {
    throw new Error("Error sending verification email");
  }
};

const sendUserVerificationEmail = async (email, verificationToken, url) => {
  try {
    await transporter.sendMail({
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: "Verify your organisation email",
      html: verifyEmailTemplate
        .replace("{publicPath}", url)
        .replace("{verificationToken}", verificationToken),
    });
  } catch (error) {
    throw new Error("Error sending verification email");
  }
};

module.exports = { sendOrgVerificationEmail, sendUserVerificationEmail };
