var express = require("express");
var router = express.Router();

const cors = require("cors");
const bodyParser = require("body-parser");

const db = require('./../database');

// Middle Ware Configurations
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const origins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5000"]

router.use(cors({
    origin : origins,
    credentials :true
}))
// router.use(cors());



router.post("/guestlogin", async (req, res) => {
    console.log("POST /guestlogin")

    const {firstname, lastname, code} = req.body;
    try {
        db.validateGuest([firstname, lastname, code] , async (err, result) => {
            if (err){
                console.log(err)
                res.status(500).send("Invalid Credentials");
            } else {
                res.status(200).json(result);
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/organiserlogin', async (req, res) => {
    console.log("POST /organiserlogin");

    const {firstname, lastname, code, password} = req.body;

    try {
        db.validateOrganiser([firstname, lastname, code, password], async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Invalid Credentials");
            } else {
                res.status(200).json(result);
            }
        })
    } catch (err) {

    }
})

module.exports = router;