const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/userAuth");

// loads variables from .env.
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 7777;

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password, bio, hobbies, photoUrl } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      bio,
      hobbies,
      photoUrl,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).send(`Failed to register user ${err.message}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLoginData(req);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    // Json web token generation with expiry of 7 days
    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Login successful",
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
    res.status(400).json({
      message: "Login failed",
      error: err.message,
    });
  }
});

// here we will use our user auth before actually handling profile requests
app.get('/profile', userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: 'Profile fetched successfully',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        hobbies: user.hobbies,
        photoUrl: user.photoUrl
      }
    })
  } catch (err) {
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    })
  }
})

app.post('/logout', userAuth, async (req, res) => {
  try {
    // 
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    // above method or res.clearCookie("token");
    res.status(200).json({
      message: 'Logout successful'
    })
  } catch (err) {
    res.status(400).json({
      message: 'Logout failed',
      error: err.message
    })
  }
})

connectDB()
  .then(() => {
    console.log("Database connected successfuly!");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("database connection failed", err.message);
  });
