"use strict";

/** Express app for webspace dashboard. */

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const db = new sqlite3.Database('webspace', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

const createCustomers = [`CREATE TABLE IF NOT EXISTS customers (
        customer_id SERIAL PRIMARY KEY,
        customerName TEXT,
        customer_company TEXT,
        customer_identity TEXT,
        address_num TEXT,
        address_street TEXT,
        address_suite TEXT,
        address_city TEXT,
        address_state TEXT,
        address_zip TEXT,
        phone TEXT,
        password TEXT,
        email TEXT
);`, `INSERT INTO customers (customerName,
        customer_company,
        customer_identity,
        address_num,
        address_street,
        address_suite,
        address_city,
        address_state,
        address_zip,
        phone,
        password,
        email)
    VALUES ("Adam Apple",
        "acorp",
        "president",
        1,
        "Main St.",
        100,
        "Baltimore",
        "MD",
        "21201",
        "4108675309",
        "password1",
        "adam@acorp.com"),
        ("Bob Baker",
        "bcorp",
        "president",
        2,
        "Main St.",
        200,
        "Baltimore",
        "MD",
        "21201",
        "4108675309",
        "password2",
        "bob@bcorp.com"),
        ("Carl Cake",
        "ccorp",
        "president",
        3,
        "Main St.",
        300,
        "Baltimore",
        "MD",
        "21201",
        "4108675309",
        "password3",
        "carl@ccorp.com");`];

const createServers = [`CREATE TABLE IF NOT EXISTS servers (
        server_id SERIAL PRIMARY KEY,
        server_type_name TEXT,
        customer_name TEXT);`,
        `INSERT INTO servers (server_type_name, customer_name)
         VALUES ("Apache Tomcat", "Adam Apple"),
                ("IIS", "Bob Baker"),
                ("Nginx", "Carl Cake")`]


const makeCustomers = async () => {
    return new Promise((resolve, reject) => {
        db.run(createCustomers[0], (err) => {
            if (err) {
                console.error('Error creating tables:', err.message);
                reject(err);
            } else {
                console.log('Tables created successfully');
                resolve("resolve customers");
            }
        });
    });
};

const makeServers = async (word) => {
    return new Promise((resolve, reject) => {
        db.run(createServers[0], (err) => {
            if (err) {
                console.error('Error creating tables:', err.message);
                reject(err);
            } else {
                console.log('Tables created successfully');
                resolve("resolve servers");
            }
        });
    });
};

const insertCustomers = async () => {
        let x = await makeCustomers();
        console.log(x);
        db.run(createCustomers[1]);
};

const insertServers = async () => {
    let x = await makeServers();
    console.log(x);
    db.run(createServers[1]);
}

insertCustomers();
insertServers();


// const tableNames = ["customers", "servers"];

// const tableNames = ["customers", "server_types", "resource_types",
//                     "code_languages", "software_technologies", "servers",
//                     "applications", "resources_used", "technologies_used",
//                     "languages_used", "technology_prices", "server_prices",
//                     "resource_prices"];

// const selectAndLogData = async (tableName) => {
//     const selectQuery = `SELECT * FROM ${tableName}`;
//     console.log('Executing query:', selectQuery); // Log the query
//     return new Promise((resolve, reject) => {
//         db.all(selectQuery, (err, rows) => {
//             if (err) {
//                 console.error(`Error selecting data from ${tableName}:`, err.message);
//                 reject(err);
//             } else {
//                 console.log(`Data in the ${tableName} table:`, rows);
//                 resolve(rows);
//             }
//         });
//     });
// };

// const insertAndSelectData = async () => {
//     try {
//         await createTables();
//         await insertData();
//     }
//         // // After data insertion, log data from each table
//         // for (let tableName of tableNames) {
//         //     await selectAndLogData(tableName);

//     catch (error) {
//         console.error("Error:", error.message);
//     }
//     finally {
//         // Optionally close the database connection after all operations
//         db.close();
//     }
// };

// insertAndSelectData();

app.get('/', (req, res) => {
    res.send('hello world')
});


// const selectQuery = `SELECT * FROM ${tableNames[0]}`;
// db.all(selectQuery, (err, rows) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Data in the database:', rows);
//     }
// });



