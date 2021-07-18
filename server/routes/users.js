const router = require("express").Router();
const { Pool } = require("pg");
const db = require("../db");

// GET ALL USERS
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

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await db.query("SELECT * FROM users WHERE user_email = $1", 
        [email]);

        res.json(user.rows);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;