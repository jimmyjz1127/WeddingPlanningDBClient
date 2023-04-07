/**
 * This file contains all route handling for the site as per REST API
 */

var express = require("express");
var router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./../database");

// Config 
const {client_port, server_port} = require('./../Config');

// ---------- Middle Ware Configurations ------------
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const origins = [
    "http://localhost:" + client_port,
    "http://127.0.0.1:" + client_port,
    "http://localhost:" + server_port,
];

router.use(
    cors({
        origin: origins,
        credentials: true,
    })
);
// router.use(cors());

// ------------------------------------------------

/**
 * Route for handling guest login
 */
router.post("/guestlogin", async (req, res) => {
    console.log("POST /guestlogin");

    const { firstname, lastname, code } = req.body;
    try {
        db.validateGuest([firstname, lastname, code], async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Invalid Credentials");
            } else {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

/**
 * Route for handling organiser login
 */
router.post("/organiserlogin", async (req, res) => {
    console.log("POST /organiserlogin");

    try {
        db.validateOrganiser(
            req.body,
            async (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Invalid Credentials");
                } else {
                    res.status(200).json(result);
                }
            }
        );
    } catch (err) {
        console.log(err)
    }
});

// Handles retrieving all dietary requirements from database
router.post("/getalldiet", async(req,res) => {
    console.log("POST /getalldiet");

    try {
        db.getAllDietInfo((err,result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Couldn't retrieve all diet requirements");
            } else {
                console.log('/getalldiet SUCCESS');
                res.status(200).json(result)
            }
        })
    } catch (err) {
        console.log(err)
    }
})

/**
 * Handles retrieving a individual guest's diet requirements
 */
router.post("/guestdiet", async (req, res) => {
    console.log('POST /guestdiet')

    try {
        // Query the database
        db.getGuestDiet(req.body, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Invalid Credentials");
            } else {
                console.log('/guestdiet SUCCESS');
                res.status(200).json(result);
            }
        });
        } catch (err) {
        console.log("ERROR : (try) /guestdiet")
    }
});

/**
 * Handles guest submitting changes for personal details 
 */
router.post("/updateguestdetails", (req,res) => {
    console.log("POST /updateguest")

    try {
        db.updateGuestInfo(req.body, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Faliure Updating Guest Details");
            } else {
                res.status(200).send("Success");
            }
        })
    } catch (err) {
        console.log("ERROR : (try) /updateguest")
    }
})

// Route for handling updates to a member of an invitation
router.post('/updatememberdetails', (req,res) => {
    console.log('POST /updatememberdetails');

    try {
        db.updateMemberInfo(req.body, async(err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Failure Updating Member Details");
            } else {
                res.status(200).send("Success");
            }
        })
    } catch (err) {

    }
})

// Route for retrieving all members that belong to a particular inivitation code 
router.post("/getparty", (req,res) => {
    console.log("POST /getparty");

    try {
        db.getParty(req.body, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Faliure Retrieving Party Details");
            } else {
                res.status(200).json(result);
            }
        })
    } catch (err) {

    }
})

// Router for retrieving all guests from database - organiser action
router.post('/getallguests', (req,res) => {
    console.log('POST /getallguests');

    try {
        db.getAllGuests(req.body, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Faliure Retrieving All Guests");
            } else {
                res.status(200).json(result);
            }
        })
    } catch (err) {

    }
})

// Router for deleting guests from database - organiser action 
router.post('/deleteguest', (req,res) => {
    console.log('POST /deleteguest');

    try {
        db.deleteGuest(req.body, async(err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Faliure deleting guest");
            }else{
                res.status(200).json(result);
            }
        })
    } catch (err) {
    }
})

//Router for handling table change 
router.post('/changetable' , (req,res) => {
    console.log('POST /changetable');

    try {
        db.changeTable(req.body, async(err,result) => {
            if (err){
                console.log(err);
                res.status(500).send("Faliure deleting guest");
            } else {
                res.status(200).json(result);
            }
        })
    } catch (err) {
        console.log(err);
    }
})

// Router for handling adding a new guest to database 
router.post('/addnewguest', (req,res) => {
    console.log('POST /addnewguest');

    console.log(req.body)

    try {
        db.addNewGuest(req.body, async(err,result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Faliure adding new guest")
            } else {
                res.status(200).send("Success");
            }
        })
    } catch (err) {
        console.log(err);
    }
})

// Route handler for updating diet description
router.post('/updatediet', (req, res) => {
    console.log('POST /updatediet');

    try {
        db.updateDiet(req.body, async(err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Failure udpating diet description")
            } else {
                res.status(200).send("Successfully update diet description");
            }
        } )
    } catch (err) {
        console.log(err)
    }
})

// Route for handling retrieval of all guests requiring special diets
router.post('/getguestswithdiet', (req,res) => {
    console.log('POST /getguestswithdiet');

    try {
        db.getGuestsWithDiet(req.body, async (err,result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error retrieving guests with special diets");
            } else {
                res.status(200).json(result)
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Route for handling inserting a new dietary requirement into database
router.post('/addnewdiet', (req,res) => {
    console.log('POST /addnewdiet');

    try {
        db.addNewDiet(req.body, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error adding new diet");
            } else {
                res.status(200).send("Success adding new diet")
            }
        })
    } catch (err) {
        console.log(err)
    }
})


// Route for handling retrieving number of guests with standard diet for all dinner tables 
router.post('/getstandardtables' , (req,res) => {
    console.log('POST /getstandardtables');

    try {
        db.getStandardDietTables(req.body, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(result);
            }
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
