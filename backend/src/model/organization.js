const mongoose = require("mongoose");
const validator = require("validator");

const organizationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password should be strong and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          );
        }
      },
    },

    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    photoUrl: {
      type: String,
    },
    publicId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "ADMIN",
    },
    members: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    projects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    VerficationTokenExpires: Date,
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
