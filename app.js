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

// app.get("/api/:name", (req, res, next) => {
//     console.log("-----");
//     console.log("run route: '/api/:table'")
//     let tableVar = req.params.table;
//     let sql = `SELECT * FROM ${tableVar}`;
//     let params = [];
//     db.all(sql, params, (err, row) => {
//         console.log("db.all runs:", "sql =", sql);
//         if (err) {
//           console.log("sql error at line 24");
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":row
//         })
//       });
// });

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
            console.log("sql error at line 53");
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// app.all("/api/:table/:name", (req, res, next) => {
//     console.log("-----");
//     console.log("run route: '/api/:table/:name'")

//     let tableVar = req.params.table;
//     let nameVar = req.params.name || null;
//     let whereInsert = "name";

//     // if (tableVar === "customers" ||
//     //     tableVar === "server_types" ||
//     //     tableVar === "resource_types" ||
//     //     tableVar === "code_languages" ||
//     //     tableVar === "software_technologies" ||
//     //     tableVar === "applications"){
//     //     whereInsert = "name";
//     // }
//     // else{
//     //     whereInsert = "name";
//     // }

//     let sql = `SELECT * FROM ${tableVar} WHERE ${whereInsert} = ?`;
//     let params = [nameVar];

//     db.all(sql, params, (err, row) => {
//         console.log("db.get runs:", "sql =", sql, "params =", params);
//         if (err) {
//           console.log("sql error at line 76");
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":row
//         })
//       });
// });

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

module.exports = app;