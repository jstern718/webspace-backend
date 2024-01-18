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


async function authenticate(username, password) {
    // try to find the user first
    const result = await db.query(`
        SELECT username,
               password
        FROM users
        WHERE username = $1`, [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  async function register(username, password){

    const duplicateCheck = await db.query(`
        SELECT username
        FROM users
        WHERE username = $1`, [username],
    );

    if (duplicateCheck.rows.length > 0) {
      throw new Error(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(`
                INSERT INTO users
                (username,
                 password)
                VALUES ($1, $2)
                RETURNING
                    username`, [
          username,
          hashedPassword
        ],
    );

    const user = result.rows[0];

    return user;
  }



// Root endpoint
app.get("/", (req, res, next) => {
    console.log("-----");
    console.log("run route: '/'");

    res.json({"message":"Ok"})
});

// API endpoints


//Login endpoint

app.post("/token", async function (req, res, next) {

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  });

app.all("/auth", async function (req, res, next) {
    console.log("-----");
    console.log("run login route: '/api/auth'");
    console.log("req", req);

    // if (req.body === undefined) throw new BadRequestError();

    const { password } = req.body;
    const result = await db.query(
          `SELECT password
             FROM customers
             WHERE name = $1`,
          [username]);
    const user = result.rows[0];
    console.log("auth user", user);
    if (user) {
        if (await bcrypt.compare(password, user.password) === true) {
            return res.json({ message: "Logged in!" });
        }
    }
    throw new UnauthorizedError("Invalid user/password");
});


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

app.post("/api/login", (request, response) => {
    User.findOne({ username: request.body.username })
    .then((user)=>{
        bcrypt.compare(request.body.password, user.password)
     })
     .then((user)=>{
            bcrypt.compare(request.body.password, user.password)
            .then((passwordCheck) => {

                if(!passwordCheck) {
                  return response.status(400).send({
                    message: "Passwords does not match",
                    error,
                  });
                }
                //   create JWT token
                const token = jwt.sign(
                    {
                      username: user.username
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                  );
                //   return success response
                response.status(200).send({
                    message: "Login Successful",
                    username: user.username,
                    token,
                });
            })
            .catch((error) => {
                response.status(400).send({
                    message: "Password does not match",
                    error,
                });
            })
    })
    .catch((e) => {
        response.status(404).send({
            message: "Email not found",
            e,
        });
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

module.exports = app;