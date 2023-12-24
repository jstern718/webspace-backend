"use strict";

// Import the database instance
const express = require("express");

const database = require('./db');
const createX = require('./seed');

/** Functions for setting up tables. */
const exportFunctions = [];

for (let index=0; index<createX.length; index++){
    const makeX = async (index) => {
        return new Promise((resolve, reject) => {
            database.run(createX[index][0], (err) => {
                if (err) {
                    console.error(`Error creating table for index ${index}:`, err.message);
                    reject(err);
                } else {
                    console.log(`Table index ${index} created successfully`);
                    resolve(`resolve ${index}`);
                }
            });
        });
    };
    exportFunctions.push(makeX)
}

module.exports = exportFunctions;