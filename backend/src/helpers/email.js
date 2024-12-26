const resend = require("../config/resendConfig");
const { verifyEmailTemplate } = require("./templates");

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your organisation email",
      html: verifyEmailTemplate.replace(
        "{verificationToken}",
        verificationToken
      ),
    });
  } catch (error) {
    throw new Error("Error sending verification email");
  }
};

module.exports = { sendVerificationEmail };
