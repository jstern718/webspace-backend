"use strict";

const express = require("express");

const createCustomers = [`CREATE TABLE IF NOT EXISTS customers (
    customer_name TEXT PRIMARY KEY,
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
    email TEXT)`,
    `INSERT INTO customers (customer_name,
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
            "carl@ccorp.com");`
];

const createServerTypes = [
    `CREATE TABLE IF NOT EXISTS server_types (
        server_type_name TEXT PRIMARY KEY)`,
    `INSERT INTO server_types (server_type_name)
        VALUES ("Apache Tomcat", "IIS", "Nginx", "LiteSpeed")`
];

const createResourceTypes = [
    `CREATE TABLE IF NOT EXISTS resource_types (
        resource_name TEXT PRIMARY KEY)`,
    `INSERT INTO resource_types (resource_name)
        VALUES ("Number of Servers", "Memory Usage", "Storage Usage", "vCPUs", "Clustered Servers")`
];

const createCodeLanguages = [
    `CREATE TABLE IF NOT EXISTS code_languages (
        language_name TEXT PRIMARY KEY)`,
    `INSERT INTO code_languages (language_name)
        VALUES ("Java", "React.js", "Python", "Node.js", "C++", "C#")`
];

const createSoftwareTechnologies = [
    `CREATE TABLE IF NOT EXISTS software_technologies (
        technology_name TEXT PRIMARY KEY)`,
    `INSERT INTO software_technologies (technology_name)
        VALUES ("Docker", "Elasticsearch", "Apache Kafka", "Redis", "AI")`
];

const createServers = [
    `CREATE TABLE IF NOT EXISTS servers (server_id SERIAL PRIMARY KEY,
        server_type_name TEXT REFERENCES server_types, customer_name TEXT REFERENCES customers)`,
    `INSERT INTO servers (server_type_name, customer_name)
        VALUES ("Apache Tomcat", "Adam Apple"), ("IIS", "Bob Baker"), ("Nginx", "Carl Cake")`
];

const createResourcesUsed = [`CREATE TABLE IF NOT EXISTS resources_used (
    id SERIAL PRIMARY KEY,
    customer_name TEXT REFERENCES customers,
    resource_name TEXT REFERENCES resource_types,
    resource_amount Integer)`,
    `INSERT INTO resources_used (customer_name, resource_name, resource_amount)
     VALUES ("Adam Apple", "Number of Servers", 1),
            ("Adam Apple", "Memory Usage", 100),
            ("Adam Apple", "Storage Usage", 100),
            ("Adam Apple", "vCPUs", 1),
            ("Adam Apple", "Clustered Servers", 0),
            ("Bob Baker", "Number of Servers", 2),
            ("Bob Baker", "Memory Usage", 200),
            ("Bob Baker", "Storage Usage", 200),
            ("Bob Baker", "vCPUs", 2),
            ("Bob Baker", "Clustered Servers", 1),
            ("Carl Cake", "Number of Servers", 3),
            ("Carl Cake", "Memory Usage", 300),
            ("Carl Cake", "Storage Usage", 300),
            ("Carl Cake", "vCPUs", 3),
            ("Carl Cake", "Clustered Servers", 1)`
];

const createTechnologiesUsed = [`CREATE TABLE IF NOT EXISTS technologies_used (
    id SERIAL PRIMARY KEY,
    server_id TEXT,
    technology_name TEXT)`,
    `INSERT INTO technologies_used (server_id, technology_name)
     VALUES (1, "Docker"),
            (1, "Elasticsearch"),
            (2, "Apache Kafka"),
            (2, "Redis"),
            (3, "AI")`
];

const createLanguagesUsed = [`CREATE TABLE IF NOT EXISTS languages_used (
    id SERIAL PRIMARY KEY,
    application_name TEXT REFERENCES applications,
    language_name TEXT REFERENCES code_languages)`,
    `INSERT INTO languages_used (application_name, language_name)
     VALUES ("appa", "Node.js"),
            ("appa", "React.js"),
            ("appb", "Python"),
            ("appb", "Java"),
            ("appc", "C++"),
            ("appc", "C#")`
];

const createApplications = [`CREATE TABLE IF NOT EXISTS applications (
    application_name TEXT PRIMARY KEY,
    version_num TEXT,
    application_url TEXT,
    application_port TEXT,
    customer_name TEXT)`,
    `INSERT INTO applications (application_name,
                               version_num,
                               application_url,
                               application_port,
                               customer_name)
    VALUES ("appa", "1", "https://appa.com", "3000", "Adam Apple"),
           ("appb", "2", "https://appb.com", "3000", "Bob Baker"),
           ("appc", "3", "https://appc.com", "3000", "Carl Cake")`
];

const createServerPrices = [`CREATE TABLE IF NOT EXISTS server_prices (
    id SERIAL PRIMARY KEY,
    server_type_name TEXT,
    server_price DECIMAL(20, 2))`,
    `INSERT INTO server_prices (server_type_name, server_price)
     VALUES ("Apache Tomcat", 10000),
            ("IIS", 11000),
            ("Nginx", 12000),
            ("LiteSpeed", 13000)`
];

const createResourcePrices = [`CREATE TABLE IF NOT EXISTS resource_prices (
    id SERIAL PRIMARY KEY,
    resource_name TEXT,
    resource_price DECIMAL(20, 2))`,
    `INSERT INTO resource_prices (resource_name, resource_price)
     VALUES ("Number of Servers", 1000),
            ("Memory Usage", 10),
            ("Storage Usage", 10),
            ("vCPUs", 1000),
            ("Clustered Servers", 1000)`
];

const createTechnologyPrices = [`CREATE TABLE IF NOT EXISTS technology_prices (
    id SERIAL PRIMARY KEY,
    technology_name TEXT,
    technology_price DECIMAL(20, 2))`,
    `INSERT INTO technology_prices (technology_name, technology_price)
     VALUES ("Docker", 1000),
            ("Elasticsearch", 2000),
            ("Apache Kafka", 3000),
            ("Redis", 4000),
            ("AI", 5000)`
];

module.exports = [createCustomers,
                  createServers,
                  createResourcesUsed,
                  createTechnologiesUsed,
                  createLanguagesUsed,
                  createApplications,
                  createTechnologyPrices,
                  createServerPrices,
                  createResourcePrices];

