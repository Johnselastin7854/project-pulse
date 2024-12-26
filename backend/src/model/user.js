const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
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
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
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
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async () => {
  const user = this;

  const tokenData = {
    username: user.firstName,
    _id: user._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });

  return token;
};

userSchema.methods.validatePassword = async (userEnterPassword) => {
  const user = this;

  const isMatch = await bcrypt.compare(userEnterPassword, user.password);

  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
