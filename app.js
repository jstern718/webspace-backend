"use strict";

/** Express app for webspace dashboard. */

const jsonschema = require("jsonschema");
const express = require("express");

const createData = require("./seed");
const makeFunctions = require("./utils");
const db = require("./db");
const Search = require("./models")

const app = express();
// const infoRoutes = require("./routes/info");
// app.use("/info", infoRoutes);

const port = 3000;

app.use(express.urlencoded());
app.use(express.json());

const insertX = async () => {
    for (let i = 0; i < createData.length; i++) {
        try {
            let returnedTables = await makeFunctions[i](i);
            console.log(returnedTables);
            await new Promise((resolve, reject) => {
                db.run(createData[i][1], (err) => {
                    if (err) {
                        console.error(`Error running query for index ${i}:`, err.message);
                        reject(err);
                    } else {
                        console.log(`Query for index ${i} executed successfully`);
                        resolve();
                    }
                });
            });
        } catch (err) {
            // Handle any errors that occurred during table creation or query execution
            console.error(`Error in iteration ${i}:`, err);
        }
    }
};

const initializeDatabase = async () => {
    try {
        await insertX();
        console.log("Database initialization completed successfully");
    } catch (err) {
        console.error("Error during database initialization:", err);
        // Handle the error as appropriate for your application
    }
};

// Initialize the database before starting the server
initializeDatabase().then(() => {
    // Start the Express app
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});

app.get("/", async function (req, res, next) {

    let table = req.query.table;
    let key = req.query.key;
    let vals = await Search.find(table);

    return res.json(vals);
    // return res.json({ table: req.query.table, key: req.query.key });
});

module.exports = app;

