const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password, bio, photoUrl, hobbies } = req.body;

     if (!firstName) {
    throw new Error("First name is required");
  }

  if (!email || !validator.isEmail(email)) {
    throw new Error("Please enter a valid email address");
  }

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Please enter a valid photo URL");
  }
};

const validateLoginData = (req) => {
    const { email, password } = req.body;

    if(!email || !validator.isEmail(email)){
        throw new Error("Please enter a valid email address");
    }

    if(!password) {
        throw new Error("Password is required!");
    }
};

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "hobbies", "bio", "photoUrl"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    if(!isEditAllowed) throw new Error('Invalid Edit request');

    const { firstName, lastName, hobbies, bio, photoUrl } = req.body;

    if (firstName && !validator.isLength(firstName, { min: 2, max: 50 })) {
    throw new Error("First name must be between 2 and 50 characters");
  }

  if (lastName && !validator.isLength(lastName, { max: 50 })) {
    throw new Error("Last name must be less than 50 characters");
  }

  if (bio && !validator.isLength(bio, { max: 300 })) {
    throw new Error("Bio must be less than 300 characters");
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Please enter a valid photo URL");
  }

  if (hobbies && !Array.isArray(hobbies)) {
    throw new Error("Hobbies must be an array");
  }
};

const validateChangePasswordData = (req) => {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword) throw new Error("Old password is required");

    if(!newPassword || !validator.isStrongPassword(newPassword)){
        throw new Error("please enter a strong password");
    }

    if(oldPassword === newPassword){
        throw new Error('New password cannot be same as old password');
    }
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateProfileEditData,
    validateChangePasswordData
};