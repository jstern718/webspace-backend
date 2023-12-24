"use strict";

const sqlite3 = require("sqlite3").verbose();

/** Function for setting up webspace database. */

const db = new sqlite3.Database('webspace', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database');
        db.run(
            `CREATE TABLE customers (
                name TEXT PRIMARY KEY,
                customer_company TEXT,
                customer_identity TEXT,
                address_num TEXT,
                address_street TEXT,
                address_road_type TEXT,
                address_suite TEXT,
                address_city TEXT,
                address_state TEXT,
                address_zip TEXT,
                phone TEXT,
                password TEXT,
                email TEXT)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                let insert1 = `INSERT INTO customers (
                                    name,
                                    customer_company,
                                    customer_identity,
                                    address_num,
                                    address_street,
                                    address_road_type,
                                    address_suite,
                                    address_city,
                                    address_state,
                                    address_zip,
                                    phone,
                                    password,
                                    email)
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                db.run(insert1, ["adamapple",
                                "acorp",
                                "president",
                                "1",
                                "Main",
                                "St.",
                                "100",
                                "Baltimore",
                                "MD",
                                "21201",
                                "4108675309",
                                "password1",
                                "adam@acorp.com"]);
                db.run(insert1, ["bobbaker",
                                "bcorp",
                                "president",
                                "2",
                                "Main",
                                "St.",
                                "200",
                                "Baltimore",
                                "MD",
                                "21201",
                                "4108675309",
                                "password2",
                                "bob@bcorp.com"]);
                db.run(insert1, ["carlcake",
                                "ccorp",
                                "president",
                                "3",
                                "Main",
                                "St.",
                                "300",
                                "Baltimore",
                                "MD",
                                "21201",
                                "4108675309",
                                "password3",
                                "carl@ccorp.com"]);
            }
        });
        db.run(
            `CREATE TABLE server_types (
                name TEXT PRIMARY KEY,
                server_price INTEGER)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert2 = `INSERT INTO server_types (
                                    name,
                                    server_price)
                                    VALUES (?, ?)`;
                db.run(insert2, ["Apache_Tomcat", 1100]);
                db.run(insert2, ["IIS", 1200]);
                db.run(insert2, ["Nginx", 1300]);
                db.run(insert2, ["LiteSpeed", 1400]);
            }
        });
        db.run(
            `CREATE TABLE resource_types (
                name TEXT PRIMARY KEY,
                resource_price INTEGER)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert3 = `INSERT INTO resource_types (
                                    name,
                                    resource_price)
                                    VALUES (?,?)`;
                db.run(insert3, ["Number_of_Servers", 100]);
                db.run(insert3, ["Memory_Usage", 50]);
                db.run(insert3, ["Storage_Usage", 75]);
                db.run(insert3, ["vCPUs", 250]);
                db.run(insert3, ["Clustered_Servers", 500]);
            }
        });
        db.run(
            `CREATE TABLE code_languages (
                name TEXT PRIMARY KEY)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert4 = `INSERT INTO code_languages (
                                    name)
                                    VALUES (?)`;
                db.run(insert4, ["Java"]);
                db.run(insert4, ["React.js"]);
                db.run(insert4, ["Python"]);
                db.run(insert4, ["Node.js"]);
                db.run(insert4, ["C++"]);
                db.run(insert4, ["C#"]);
            }
        });
        db.run(
            `CREATE TABLE software_technologies (
                name TEXT PRIMARY KEY,
                technology_price INTEGER)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert5 = `INSERT INTO software_technologies (
                                    name,
                                    technology_price)
                                    VALUES (?, ?)`;
                db.run(insert5, ["Docker", 100]);
                db.run(insert5, ["Elasticsearch", 200]);
                db.run(insert5, ["Apache_Kafka", 300]);
                db.run(insert5, ["Redis", 400]);
                db.run(insert5, ["AI", 500]);
            }
        });
        db.run(
            `CREATE TABLE servers_used (
                id INTEGER PRIMARY KEY,
                server_name TEXT REFERENCES server_types,
                customer_name TEXT REFERENCES customers)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert6 = `INSERT INTO servers_used (
                                    server_name,
                                    customer_name)
                                    VALUES (?,?)`;
                db.run(insert6, ["Apache_Tomcat", "Adam_Apple"]);
                db.run(insert6, ["IIS", "Bob_Baker"]);
                db.run(insert6, ["Nginx", "Carl_Cake"]);
            }
        });
        db.run(
            `CREATE TABLE resources_used (
                id INTEGER PRIMARY KEY,
                customer_name TEXT REFERENCES customers,
                resource_name TEXT REFERENCES resource_types,
                resource_amount Integer)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert7 = `INSERT INTO resources_used (
                                    customer_name,
                                    resource_name,
                                    resource_amount)
                                    VALUES (?,?,?)`;
                db.run(insert7, ["Adam Apple", "Number_of_Servers", 1]);
                db.run(insert7, ["Adam Apple", "Memory_Usage", 100]);
                db.run(insert7, ["Adam Apple", "Storage_Usage", 100]);
                db.run(insert7, ["Adam Apple", "vCPUs", 1]);
                db.run(insert7, ["Adam Apple", "Clustered_Servers", 0]);
                db.run(insert7, ["Bob Baker", "Number_of_Servers", 2]);
                db.run(insert7, ["Bob Baker", "Memory_Usage", 200]);
                db.run(insert7, ["Bob Baker", "Storage_Usage", 200]);
                db.run(insert7, ["Bob Baker", "vCPUs", 2]);
                db.run(insert7, ["Bob Baker", "Clustered_Servers", 1]);
                db.run(insert7, ["Carl Cake", "Number_of_Servers", 3]);
                db.run(insert7, ["Carl Cake", "Memory_Usage", 300]);
                db.run(insert7, ["Carl Cake", "Storage_Usage", 300]);
                db.run(insert7, ["Carl Cake", "vCPUs", 3]);
                db.run(insert7, ["Carl Cake", "Clustered_Servers", 1]);
            }
        });
        db.run(
            `CREATE TABLE technologies_used (
                id INTEGER PRIMARY KEY,
                customer_name TEXT REFERENCES customers,
                technology_name TEXT REFERENCES software_technologies)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert8 = `INSERT INTO technologies_used (
                                    customer_name,
                                    technology_name)
                                    VALUES (?,?)`;
                db.run(insert8, ["Adam_Apple", "Docker"]);
                db.run(insert8, ["Adam_Apple", "Elasticsearch"]);
                db.run(insert8, ["Bob_Baker", "Apache_Kafka"]);
                db.run(insert8, ["Bob_Baker", "Redis"]);
                db.run(insert8, ["Carl_Cake", "AI"]);
            }
        });

        db.run(
            `CREATE TABLE applications (
                name TEXT PRIMARY KEY,
                version_num TEXT,
                application_url TEXT,
                application_port TEXT,
                customer_name TEXT REFERENCES customers)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert9 = `INSERT INTO applications (
                                    name,
                                    version_num,
                                    application_url,
                                    application_port,
                                    customer_name)
                                    VALUES (?,?,?,?,?)`;
                db.run(insert9, ["appa", "1",
                                 "https://appa.com",
                                 "3000",
                                 "Adam_Apple"]);
                db.run(insert9, ["appb", "2",
                                 "https://appb.com",
                                 "3000",
                                 "Bob_Baker"]);
                db.run(insert9, ["appc", "3",
                                 "https://appc.com",
                                 "3000",
                                 "Carl_Cake"]);
            }
        });
        db.run(
            `CREATE TABLE languages_used (
                id INTEGER PRIMARY KEY,
                application_name TEXT REFERENCES applications,
                language_name TEXT REFERENCES code_languages)`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                let insert10 = `INSERT INTO languages_used (
                                    application_name,
                                    language_name)
                                    VALUES (?,?)`;
                db.run(insert10, ["appa", "Node.js"]);
                db.run(insert10, ["appa", "React.js"]);
                db.run(insert10, ["appb", "Python"]);
                db.run(insert10, ["appb", "Java"]);
                db.run(insert10, ["appc", "C++"]);
                db.run(insert10, ["appc", "C#"]);
            }
        });
    }
});

module.exports = db;


