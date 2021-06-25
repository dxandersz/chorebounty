require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");

// MIDDLEWARE! //
app.use(express.json());
app.use(morgan("dev"));

// ROUTES!! //

// SERVER!! //
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server running on port ${port}!`);
});