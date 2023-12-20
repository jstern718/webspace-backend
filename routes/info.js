// "use strict";

// const express = require("express");
// const db = require("../db");
// const router = new express.Router();
// const Search = require("../models");
// // const app = require("../app");
// const [app, insertFunc] = require("../app");


// /** GET /  =>
//  *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
//  */

// // router.get("/?:q?", async function (req, res, next) {
// router.get("/", async function (req, res, next) {

//     await insertFunc();
//     let table = req.query.table;
//     let key = req.query.key;
//     let vals = await Search.find(table, key);
//     console.log("vals", vals);

//     // return res.json({ table: tableValue, key: keyValue });
//     // return res.json({ table: req.query.table, key: req.query.key });
// });


// module.exports = router;