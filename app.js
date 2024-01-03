"use strict";

// Create express app
let express = require("express");
let app = express();
let db = require("./db.js")
const cors = require('cors');


app.use(cors());

// Root endpoint
app.get("/", (req, res, next) => {
    console.log("-----");
    console.log("run route: '/'");

    res.json({"message":"Ok"})
});

// Insert other API endpoints here

app.all("/api/:name/:table", (req, res, next) => {
    console.log("-----");
    console.log("run route: '/api/:name/:table'");

    let nameVar = req.params.name || null;
    let tableVar = req.params.table || null;

    let sql = `SELECT * FROM ${tableVar} WHERE name = ?`;
    let params = [nameVar];

    db.all(sql, params, (err, row) => {
        console.log("db.all runs:", "sql =", sql);
        console.log("params =", params);
        if (err) {
            console.log("sql error at line 32");
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// app.all("/api/:name/:table/:info", (req, res, next) => {
//     console.log("-----");
//     console.log("run route: '/api/:name/:table/:info'");

//     let nameVar = req.params.name || null;
//     let tableVar = req.params.table || null;
//     let infoVar = req.params.info || null;
//     let whereInsert = "application_name"

//     let sql = `SELECT * FROM ${tableVar} WHERE name = ?,
//      ${whereInsert} = ?`;
//     let params = [nameVar, infoVar];

//     db.all(sql, params, (err, row) => {
//         console.log("db.all runs:", "sql =", sql);
//         console.log("params =", params);
//         if (err) {
//             console.log("sql error at line 60");
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message":"success",
//             "data":row
//         })
//     });
// });

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

module.exports = app;