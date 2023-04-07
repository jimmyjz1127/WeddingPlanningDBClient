/**
 * This file sets up the express router and runs the server
 */

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Config 
const {server_port, client_port, host_server_url, host_client_url} = require('./Config');

// Routers
const indexRouter = require("./routes/index");
const { urlencoded } = require("express");

// Set up router
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route Handling
app.use("/", indexRouter);

// Run Server on port 5050
app.listen(server_port, () => {
  console.log("Server started on port " + server_port);
});
