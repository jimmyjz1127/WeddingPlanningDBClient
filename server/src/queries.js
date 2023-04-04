const mysql = require('mysql');

const pool = mysql.createConnection({
    user : 'jz75',
    host:'jz75.host.cs.st-andrews.ac.uk',
    database: 'jz75_CS3101_P2',
    password:'.8e96x3iPGU6Q9'
});

pool.connect((err) => {
    if (err) {
        console.error(err);
    } else{
        console.log('Database Connected!');
    }
});

module.exports = pool;