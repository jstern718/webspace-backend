"use strict";

const db = require("./db");

/** Related functions*/

class Search {

    static async find(key) {
        console.log("find function runs");
        console.log("select", `SELECT * FROM customers;`)
        return db.all(`
            SELECT * FROM customers;`)
    }

}

module.exports = Search;