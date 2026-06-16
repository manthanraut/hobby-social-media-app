const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
      maxLength: 300,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    photoUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;