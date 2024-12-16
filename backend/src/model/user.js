const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchem = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error(
            "First name should only contain alphabetic characters"
          );
        }
      },
    },

    lastName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 50,
      required: true,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error(
            "Last name should only contain alphabetic characters"
          );
        }
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator(isEmail)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password should be strong and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    photUrl: {
      type: String,
      default: "https://via.placeholder.com/150",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL");
        }
      },
    },
    gender: {
      type: String,
      lowercase: true,
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length < 3) {
          throw new Error("Skills array should contain at least 3 skills");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchem);

module.exports = User;
