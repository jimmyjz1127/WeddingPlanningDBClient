/**
 * This file sets up the connection between the server and database
 */

const mysql = require("mysql");

const pool = mysql.createConnection({
  user: "jz75",
  host: "127.0.0.1",
  database: "jz75_CS3101_P2",
  password: ".8e96x3iPGU6Q9",
});

pool.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database Connected!");
  }
});

module.exports = pool;
