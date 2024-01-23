"use strict";

// Create express app
let express = require("express");
let app = express();
let db = require("./db.js")

// const auth = require("./auth");

const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//prevent cors error
app.use(cors());
// process JSON body => req.body
app.use(express.json());

async function compare(incomingPassword, savedPassword){
    console.log("incomingPassword", incomingPassword);
    console.log("savedPassword", savedPassword);
    const compared = await bcrypt.compare(incomingPassword, savedPassword);
    console.log("compared", compared);
    return compared;
}

 /** Register user
  *  {username, password} => {username} */

app.post("/register", async function (req, res, next) {

    // if (req.body === undefined) throw new BadRequestError();
    console.log("req.body register", req.body)
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(
        password, 10
    );
    const result = await db.run(
    `INSERT INTO users (name, password)
            VALUES
            ($1, $2)`,
        [name, hashedPassword]);

    const token = jwt.sign({ name }, "secret");
    console.log("register token", token)
    return res.json({ token });

});

/** Login: returns JWT on success. */
app.post("/login", async function (req, res, next) {

    // if (req.body === undefined) throw new BadRequestError();
    console.log("req.body login", req.body);

    let nameVar = req.body.name || null;
    let tableVar = "users";
    console.log("req.body.password", req.body.password);
    const name = req.body.name;

    let sql = `SELECT *
                FROM ${tableVar}
                WHERE name = ?`;
    let params = [nameVar];

    db.all(sql, params, (err, row) => {
        console.log("db.all runs:", "sql =", sql);
        console.log("params =", params);
        console.log("row[0].password - saved", row[0].password);
        console.log("req.body.password - incoming", req.body.password);

        const isValid = compare(req.body.password, row[0].password);
        if (isValid){
            res.json({
                "message":"success",
                "data": jwt.sign( { name }, "secret")
            })
        }
        // else {
        //     console.log("sql error in login");
        //     res.status(400).json({"error":err.message});
        //     return;
        // }



    });
});



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

////Endpoints with 2 Params

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