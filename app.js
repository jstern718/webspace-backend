"use strict";

// Create express app
let express = require("express");
let app = express();
let db = require("./db.js")
const cors = require('cors');

//prevent cors error
app.use(cors());

// Root endpoint
app.get("/", (req, res, next) => {
    console.log("-----");
    console.log("run route: '/'");

    res.json({"message":"Ok"})
});

// API endpoints

//Endpoint for 1 Param

app.all("/api/:table", (req, res, next) => {
    console.log("-----");
    console.log("run route: '/api/:table'");

    let tableVar = req.params.table || null;

    let sql = `SELECT * FROM ${tableVar}`;

    db.all(sql, (err, row) => {
        console.log("db.all runs:", "sql =", sql);
        if (err) {
            console.log("sql error at line 30");
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

//Endpoint for 2 Params

app.all("/api/:name/:table", (req, res, next) => {
    console.log("-----");
    console.log("run route: '/api/:name/:table'");

    let nameVar = req.params.name || null;
    let tableVar = req.params.table || null;

    let sql = `SELECT *
                FROM ${tableVar}
                WHERE name = ?`;
    let params = [nameVar];

    db.all(sql, params, (err, row) => {
        console.log("db.all runs:", "sql =", sql);
        console.log("params =", params);
        if (err) {
            console.log("sql error at line 58");
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

module.exports = app;