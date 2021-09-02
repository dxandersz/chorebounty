const router = require("express").Router();
const db = require("../db");
const authorization = require('../middleware/authorization');

router.get("/", authorization, async(req, res) => {
    try {
        // req.user comes from authorization, contains jwt payload
        const user = await db.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
    } catch (err) {
        console.err(err.message)
        res.status(500).json("Server Error");
    }
});

module.exports = router;