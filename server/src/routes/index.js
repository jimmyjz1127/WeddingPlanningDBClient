var express = require("express");
var router = express.Router();

const cors = require("cors");
const bodyParser = require("body-parser");
// const { v1: uuidv1 } = require("uuid");

// Middle Ware Configurations
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cors({
    origin : "http://localhost:4000",
    credentials :true
}))

module.exports = router;