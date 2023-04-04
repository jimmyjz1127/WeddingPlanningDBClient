// Dependencies 
const express = require('express');
// const fs = require('fs');
// const path = require('path');
const bodyParser = require('body-parser');


// Routers
const indexRouter = require("./routes/index");
// const { allowedNodeEnvironmentFlags } = require('process');
const { urlencoded } = require('express');


// Set up router 
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route Handling 
app.use("/", indexRouter);


// Run Server on port 5000
app.listen(5000, () => {
    console.log("Server started on port 5000");
})
