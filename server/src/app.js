const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");

// loads variables from .env.
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // allows cookies to move between frontend and backend.
}));

const PORT = process.env.PORT || 7777;

// handle login, logout and signup
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

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
