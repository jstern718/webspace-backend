"use strict";

const sqlite3 = require("sqlite3").verbose();

/** Function for setting up webspace database. */

const db = new sqlite3.Database('webspace', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database');
    }
});

module.exports = db;

