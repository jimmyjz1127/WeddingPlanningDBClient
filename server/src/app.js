// Dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


// Routers
const indexRouter = require("./routes/index");
// const { allowedNodeEnvironmentFlags } = require('process');
// const { urlencoded } = require('body-parser');


// Set up router 
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Route Handling 
app.use("/", indexRouter);


// Run Server on port 5050
app.listen(5050, () => {
    console.log("Server started on port 5050");
})
