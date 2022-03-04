require('dotenv').config();
const dbParams = require('../lib/db.js');
const fs = require('fs');
const mysql = require('mysql');


const connection = mysql.createConnection(dbParams)
connection.connect();

//run migrations
const runMigrations = function () {
    const schemaFilenames = fs.readdirSync('../migration');
    
    for (const fn of schemaFilenames) {
        const sql = fs.readFileSync(`../migration/${fn}`, 'utf8');
        console.log(sql);
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            else {
                console.log(results);
            }
        });
    };
}

try {
    runMigrations();
    connection.end();
} catch (err) {
    connection.end();
}