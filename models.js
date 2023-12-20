"use strict";

const db = require("./db");

/** Related functions*/

class Search {

    static async find(table) {
        const response = await db.exec(`
            SELECT * FROM ${table}`);
        return response;
    }

}

module.exports = Search;