const router = require("express").Router();
const { Pool } = require("pg");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// GET ALL USERS ROUTE
router.get('/', async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "SELECT * FROM users");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// REGISTER ROUTE
router.post("/register", validInfo, async (req, res) => {
    // Verify that email and username aren't already in use.
    try {
        const { name, email, password } = req.body;
        const user = await db.query("SELECT * FROM users WHERE user_email = $1 OR user_name = $2", [email, name]);
        if (user.rows.length !== 0) {
            return res.status(401).send("Email or username already taken.");
        };

        // Use Bcrypt to conceal the user password.
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        // Register the user in the database
        const newUser = await db.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);        
        // Create a JWT token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.log(err);
    }
});

// LOGIN ROUTE
router.post('/login', validInfo, async (req, res) => {
    try {
        // Destructure req.body
        const { email, password } = req.body;
        // Check for user's existence
        const user = await db.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).send("Incorrect Email or Password Entered")
        }

        // Authenticate incoming password against database
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        
        if (!validPassword) {
            return res.status(401).json("Password or Email is Incorrect");
        }
        // Give user jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");  
    };
});

module.exports = router;