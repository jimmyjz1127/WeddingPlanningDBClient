/**
 * This file contains all database interfacing functions (prepared statement injection)
 */

const pool = require('./queries.js');
const fs = require('fs/promises');

/**
 * Queries database to determine if provided organiser credentials are valid 
 * @param (values) : [firstname, lastname, invitation_code, password]
 */
const validateOrganiser = (body, callback) => {
    let {id, password} = body;

    let query = 
        'SELECT person.*, invitation.date_sent, invitation.address ' +
        'FROM person INNER JOIN invitation ON person.invitation_code=invitation.code ' +
        'INNER JOIN organiser ON person.id=organiser.person_id ' +
        'WHERE person.id=(?) AND organiser.password=(?)';

    pool.query(query, [id, password], (err, res) => {
        if (err) {
            callback("Invalid Organiser Credentials!")
        } else if (res.length == 0) {
            callback("Invalid Organiser Credentials!")
        } else {
            callback(null, eval(JSON.stringify(res)))
        }
    })
}

/**
 * Queries database to determine if provided guest credentials are valid 
 * @param (values) : [firstname, lastname, invitation_code]
 */
const validateGuest = (values, callback) => {
    let query = 
        'SELECT person.*, invitation.date_sent, invitation.address ' +
        'FROM person INNER JOIN invitation ON person.invitation_code = invitation.code ' +
        'WHERE full_name=(?) and invitation_code=(?)';

    let full_name = values[0] + " " + values[1];
    let invitation_code = values[2];

    pool.query(query, [full_name, invitation_code], (err,res) => {
        if (err || res.length == 0) {
            callback("Invalid Guest Credentials!");
        } else {
            callback(null, eval(JSON.stringify(res)));
        }
    })
}

/**
 * Retrieves all dietary requirements from database
 * @param {*} callback 
 */
const getAllDietInfo = (callback) => {
    let query = 'SELECT * FROM dietary_requirement';

    pool.query(query, [], (err,res) => {
        if (err) {
            console.log(err);
            callback("Error retrieving all diets!");
        } else {
            callback(null, eval(JSON.stringify(res)))
        }
    })
}


/**
 * Returns the dietary requirements of a person
 * @param {*} body : {id:id}
 * @param {*} callback 
 */
const getGuestDiet = (body, callback) => {
    const {id} = body;
    let query = 
        'SELECT dietary_requirement.* ' +
        'FROM dietary_requirement INNER JOIN guest_diet ON guest_diet.dietary_requirement_name=dietary_requirement.short_name ' +
        'WHERE guest_diet.person_id=(?)';
    
    pool.query(query, [id], (err,res) => {
        if (err){
            callback("Error retrieving dietary requirements!", null);
        } else {
            callback(null, eval(JSON.stringify(res)));
        }
    })
}

/**
 * Deletes guest's diet requirements from guest_diet table
 * @param {*} id    : id of guest 
 * @param {*} callback 
 */
const removeOldGuestDiet = (id, callback) => {
    let query = 'DELETE FROM guest_diet WHERE person_id=(?)';

    pool.query(query, [id], (err,res) => {
        if (err) {
            console.log(err);
            callback("Error deleting guest_diet for : " + id);
        } else {
            callback(null, "Success deleting guest_id for : " + id);
        }
    })
}

/**
 * Given an array of dietary requirement short names, updates database to include these requirements for a particular user
 * @param {*} id : id of guest 
 * @param {*} requirements : array of diet requirement short names 
 * @param {*} callback 
 */
const updateGuestDiet = (id, requirements, callback) => {
    // Delete old diet 
    removeOldGuestDiet(id, (result) => {
        console.log(result);
    })

    let query = 'INSERT INTO guest_diet VALUES((?), (?))'

    requirements.map(short_name => {
        pool.query(query, [id, short_name], (err,res) => {
            if (err){
                console.log("Skipped diet requirement for " + id);
            } 
        })
    })

    callback(true);
}

/**
 * Updates a guests personal data from guest personal details form submission
 * @param {*} values  : [response, notes, address, id] 
 * @param {*} diet : [array of short names]
 * @param {*} id : id of guest 
 * @param {*} callback 
 */
const updateGuestInfo = (body, callback) => {
    let {id, address, diet, notes, response} = body;

    // Update diet information
    updateGuestDiet(id, diet, (result) => {
        console.log(result)
    })

    if (response != 1 && response != 0) {
        response = null;
    }

    let values = [response, notes, address, id];

    let query = 'UPDATE person JOIN invitation ON person.invitation_code=invitation.code SET person.response=(?), person.notes=(?), invitation.address=(?) WHERE person.id=(?)';

    pool.query(query, values, (err,res) => {
        if (err) {
            callback("Error updating guest details for " + id)
        } else {
            callback(null, "Success");
        }
    })
}

/**
 * For a given invitation code, queries database for data of all guests under the inivitation code
 * @param {*} body : object containing id of guest requesting information and invitation code 
 * @param {*} callback 
 */
const getParty = (body, callback) => {
    let {id, code} = body;

    let query = 'SELECT * FROM person WHERE invitation_code=(?) AND NOT id=(?)';

    pool.query(query, [code, id], (err,res) => {
        if (err) {
            callback("Error getting party for : " + code);
        } else{
            callback(null, eval(JSON.stringify(res)))
        }
    })
}

/**
 * Updates a guests personal data from guest personal details form submission
 * @param {*} values  : [response, notes, id] 
 * @param {*} diet : [array of short names]
 * @param {*} id : id of guest 
 * @param {*} callback 
 */
const updateMemberInfo = (body, callback) => {
    let {id, response, notes, diet} = body;

    // Update guest dietary requirements
    updateGuestDiet(id, diet, (result) => {
        console.log(result);
    })

    if (response != 1 && response != 0) {
        response = null;
    }

    let query = 'UPDATE person JOIN invitation ON person.invitation_code=invitation.code SET person.response=(?), person.notes=(?) WHERE person.id=(?)';

    pool.query(query, [response, notes, id], (err, res) => {
        if (err) {
            console.log(err);
            callback('Error updating member info for : ' + id, null);
        } else {
            callback(null, "SUCCESS updating party member : " + id);
        }
    })
}

/**
 * Retrieves all guests from database
 */
const getAllGuests = (body, callback) => {
    const {id} = body;

    let query = 'SELECT * FROM person';

    pool.query(query, [], (err,res) => {
        if (err) {
            callback('Error retrieving all guests');
        } else {
            callback(null, eval(JSON.stringify(res)))
        }
    })
}

/**
 * Deletes entry in guest_diet table for particualr guest id
 * @param {*} id : id of guest 
 * @param {*} callback 
 */
const deleteFromGuestDiet = (id, callback) => {
    let query = 'DELETE FROM guest_diet WHERE person_id=(?)';

    pool.query(query, [id], (err,res) => {
        if (err) {
            callback('Error deleting from guest_diet for : ' + id);
        } else {
            callback(null, "Success");
        }
    })
}

/**
 * Deletes entry in organiser table for particular guest id
 * @param {*} id : id of organiser
 * @param {*} callback 
 */
const deleteFromOrganiser = (id, callback) => {
    let query = 'DELETE FROM organiser WHERE person_id=(?)';

    pool.query(query, [id], (err,res) => {
        if (err) {
            callback('Error deleting from organiser for : ' + id);
        } else{
            callback(null, "Success");
        }
    })
}

/**
 * Deletes from person entirely from database
 * @param {*} body 
 * @param {*} callback 
 */
const deleteGuest = (body, callback) => {
    const {id} = body;

    deleteFromGuestDiet(id, (result) => {
        console.log(result);
    })

    deleteFromOrganiser(id, (result) => {
        console.log(result);
    })

    let query = 'DELETE FROM person WHERE id=(?)';

    pool.query(query, [id], (err, res) => {
        if (err) {
            callback('Error deleting from person for ' + id);
        } else {
            callback(null, "Success");
        }
    })
}

/**
 * Updates a guests table number
 * @param {*} body 
 * @param {*} callback 
 */
const changeTable = (body, callback) => {
    const {id, table} = body;

    let query = 'UPDATE person SET table_no=(?) WHERE id=(?)';

    pool.query(query, [table, id], (err, res) => {
        if (err) {
            callback(err, null)
        } else{
            callback(null, "Success")
        }
    })
}

/**
 * Adds a new invitation to table
 * @param {*} code 
 * @param {*} address 
 * @param {*} date 
 * @param {*} callback 
 */
const addNewInvitation = (code, address, date, callback) => {
    let query = 'INSERT INTO invitation VALUES((?), (?), (?))'

    pool.query(query, [code, address, date], (err, res) => {
        if (err) {
            callback("Code already exists", null)
        } else {
            callback(null, "Success")
        }
    })
}

/**
 * Inserts a new guest into database - calls procedure proc_add_person
 * @param {*} body 
 * @param {*} callback 
 */
const addNewGuest = async (body, callback) => {
    const {full_name, code, table, response, date, notes, address} = body;

    // Add new address 
    await addNewInvitation(code, address, date.slice(0, 10), (result) => {
        console.log(result)
    })

    // let query = 'INSERT INTO person(full_name, response, notes, invitation_code, table_no) VALUES((?),NULL,(?),(?),(?))';

    let query = 'CALL proc_add_person((?), (?), (?), (?))';

    pool.query(query, [full_name, notes, code, table], (err,res) => {
        if (err) {
            console.log(err);
            callback("Error adding new guest for : " + full_name)
        } else {
            callback(null, "Success")
        }
    })
}

/**
 * Updates diet description
 * @param {*} body 
 * @param {*} callback 
 */
const updateDiet = async (body, callback) => {
    const {short_name, description} = body;

    let query = 'UPDATE dietary_requirement SET description=(?) WHERE short_name=(?)'

    pool.query(query, [description, short_name], (err, res) => {
        if (err) {
            console.log(err);
            callback('Error updating diet for : ' + short_name);
        } else {
            callback(null, "Success");
        }
    })
}

/**
 * Retrieves all guests with special diet requiremetn from view_special_diets
 * @param {*} body 
 * @param {*} callback 
 */
const getGuestsWithDiet = async (body, callback) => {
    let query = 'SELECT * FROM view_special_diets';

    pool.query(query, [], (err,res) => {
        if (err) {
            console.log(err);
            callback('Error getting guests with special diets', null);
        } else {
            callback(null, eval(JSON.stringify(res)))
        }
    })
}

/**
 * Adds a new diet to database in table dietary_requirement
 * @param {*} body 
 * @param {*} callback 
 */
const addNewDiet = async (body, callback) => {
    const {short_name, description} = body;

    let query = 'INSERT INTO dietary_requirement VALUES((?), (?))';

    pool.query(query, [short_name, description], (err,res) => {
        if (err) {
            console.log(err);
            callback("Faliure inserting new diet for " + short_name);
        } else {
            callback(null, "Success adding new diet")
        }
    })
}

/**
 * Retrieves all data from view_standard_dinner
 * @param {*} body 
 * @param {*} callback 
 */
const getStandardDietTables = async (body, callback) => {
    let query = 'SELECT view_standard_dinner.*, dinner_table.capacity FROM view_standard_dinner ' + 
                'INNER JOIN dinner_table ON dinner_table.table_no=view_standard_dinner.table_number';

    pool.query(query, [], (err,res) => {
        if (err) {
            console.log(err);
            callback('Failure retrieving standard diet tables');
        } else {
            callback(null, eval(JSON.stringify(res)));
        }
    })
}


module.exports = {
    validateOrganiser,
    validateGuest,
    getGuestDiet,
    updateGuestDiet,
    updateGuestInfo,
    getParty,
    updateMemberInfo,
    getAllGuests,
    deleteFromGuestDiet,
    deleteFromOrganiser,
    deleteGuest,
    changeTable,
    addNewGuest,
    getAllDietInfo,
    updateDiet,
    getGuestsWithDiet,
    addNewDiet,
    getStandardDietTables
}