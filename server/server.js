require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");

// MIDDLEWARE! //
app.use(express.json());
app.use(morgan("dev"));

// ROUTES!! //

app.get('/', (req, res, next) => {
    res.send("It's the fucking homepage dudes!");
    console.log("It's a fucking test!");
    next();
});

// GET ALL CHORES //
app.get("/api/v1/chores", async (req, res) => {
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
app.get("/api/v1/chores/:id", async (req, res) => {
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
app.post("/api/v1/chores", async (req, res) => {
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
app.put("/api/v1/chores/:id", async (req, res) => {
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
app.delete("/api/v1/chores/:id", async (req, res) => {
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

// SERVER!! //
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server running on port ${port}!`);
});

