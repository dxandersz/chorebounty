const router = require("express").Router();
const { Pool } = require("pg");
const db = require("../db");

// GET ALL CHORES //
router.get("/", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "SELECT * FROM chores");

        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                chore: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// GET CHORE BY ID //
router.get("/:id", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "SELECT * FROM chores WHERE id = $1;",
            [req.params.id]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                chore: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// CREATE A NEW CHORE //

router.post("/", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "INSERT INTO chores (name, description, point_value) values ($1, $2, $3) RETURNING *",
            [req.body.name, req.body.description, req.body.point_value]
        );

        console.log(results);
        res.status(201).json({
            status: "success",
            results: results.rows.length,
            data: {
                chore: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// EDIT AN EXISTING CHORE BY ID //
router.put("/:id", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "UPDATE chores SET name = $1, description = $2, point_value = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.description, req.body.point_value, req.params.id]
        );
        console.log(results)
        res.status(200).json({
            status: 'success',
            data: {
                chore: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err)
    }
});

// DELETE AN EXISTING CHORE BY ID //
router.delete("/:id", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "DELETE FROM chores WHERE id = $1",
            [req.params.id]
        );
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;