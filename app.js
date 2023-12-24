"use strict";

// Create express app
let express = require("express");
let app = express();
let db = require("./db.js")


// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert other API endpoints here

//TODO: Shows everything in customers, but for servers_used and applications only shows first one.
//Not sure about other tables.

app.get("/api/:table/:name/:info", (req, res, next) => {
    let tableVar = req.params.table;
    let infoVar = req.params.info;
    let nameVar;
    if (tableVar === "customers" ||
        tableVar === "server_types" ||
        tableVar === "resource_types" ||
        tableVar === "code_languages" ||
        tableVar === "software_technologies" ||
        tableVar === "applications"){
        nameVar = "name";
    }
    else{
        nameVar = "id";

    }
    let sql = `SELECT ${infoVar} FROM ${tableVar} WHERE ${nameVar} = ?`
    let params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.get("/api/:table/:name", (req, res, next) => {
    let tableVar = req.params.table;
    let nameVar;
    if (tableVar === "customers" ||
        tableVar === "server_types" ||
        tableVar === "resource_types" ||
        tableVar === "code_languages" ||
        tableVar === "software_technologies" ||
        tableVar === "applications"){
        nameVar = "name";
    }
    else{
        nameVar = "id";

    }
    let sql = `SELECT * FROM ${tableVar} WHERE ${nameVar} = ?`
    let params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.get("/api/:table", (req, res, next) => {
    let tableVar = req.params.table;
    let sql = `SELECT * FROM ${tableVar}`
    let params = []
    db.get(sql, params, (err, row) => {
        if (err) {
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