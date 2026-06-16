const express = require("express");
const bcrypt = require("bcrypt");
const userAuth = require("../middlewares/userAuth");
const {
  validateProfileEditData,
  validateChangePasswordData,
} = require("../utils/validation");

const profileRouter = express.Router();

// here we will use our user auth before actually handling profile requests
profileRouter.get("/", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: "Profile fetched successfully",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        hobbies: user.hobbies,
        photoUrl: user.photoUrl,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    validateProfileEditData(req);
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();

    res.status(200).json({
      message: "Profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid edit request",
      error: err.message,
    });
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  try {
    validateChangePasswordData(req);

    const loggedInUser = req.user;
    const { oldPassword, newPassword } = req.body;

    const isOldPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (!isOldPasswordValid) throw new Error("Old password is incorrect");

    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;

    await loggedInUser.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "failed to update password",
      error: err.message,
    });
  }
});
module.exports = profileRouter;
