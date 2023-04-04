const pool = require('./queries.js');
const fs = require('fs/promises');

/**
 * Queries database to determine if provided organiser credentials are valid 
 * @param (values) : [firstname, lastname, invitation_code, password]
 */
const validateOrganiser = (values, callback) => {
    let query = 
        'SELECT person.*, invitation.date_sent, invitation.address ' +
        'FROM person INNER JOIN invitation ON person.invitation_code=invitation.code ' +
        'INNER JOIN organiser ON person.id=organiser.person_id ' +
        'WHERE person.full_name=(?) AND person.invitation_code=(?) AND organiser.password=(?)';

    let full_name = values[0] + " " + values[1];
    let invitation_code = values[2];
    let password = values[3];

    pool.query(query, [full_name, invitation_code, password], (err, res) => {
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
 * Returns the dietary requirements of a person
 * @param {*} values : [id]
 * @param {*} callback 
 */
const getGuestDiet = (values, callback) => {
    let query = 
        'SELECT dietary_requirement.short_name, dietary_requirement.description ' +
        'FROM dietary_requirement INNER JOIN guest_diet ON guest_diet.dietary_requirement_name=dietary_requirement.short_name ' +
        'WHERE guest_diet.person_id=(?)';
    
        pool.query(query, values, (err,res) => {
            if (err){
                callback("Error retrieving dietary requirements!");
            } else {
                callback(null, eval(JSON.stringify(res)));
            }
        })
}




module.exports = {
    validateOrganiser,
    validateGuest,
    getGuestDiet
}