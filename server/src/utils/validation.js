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
}

module.exports = {
    validateSignUpData,
    validateLoginData
};