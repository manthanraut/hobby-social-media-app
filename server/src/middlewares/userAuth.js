const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
   try {
    const { token } = req.cookies;
    if(!token) {
      throw new Error('Please login first');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if(!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next(); // process with next request handler
  } catch (err) {
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    })
  }
}

module.exports = userAuth;
