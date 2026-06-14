const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// loads variables from .env.
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

const PORT = process.env.PORT || 7777;

app.get('/test', (req, res) => {
    res.send("Test route is working");
});

app.get('/hello', (req, res) => {
    res.send("Hello from social media app!");
})

connectDB().then(() => {
    console.log("Database connected successfuly!");

    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    })
}).catch((err) => {
    console.error("database connection failed", err.message);
})

