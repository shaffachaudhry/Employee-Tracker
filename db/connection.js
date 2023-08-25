const mysql = require('mysql2');

 const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'august7',
    database: 'company_db'
});
//Establish a connection to a MySQL database using the mysql library.


module.exports = db;

//Exporting to allow other module to utiloize connection.js