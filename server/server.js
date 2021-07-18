require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const db = require("./db");

// MIDDLEWARE! //

// Lets us access req.body in API calls
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(morgan("combined")); // Logging in terminal
app.use(helmet()); // 
app.use(cors());

// ROUTES!! //
app.use("/api/v1/chores", require("./routes/chores"));
app.use("/api/v1/auth", require("./routes/users"));

// SERVER!! //
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server running on port ${port}!`);
});

