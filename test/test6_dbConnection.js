const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "10.1.42.7",
    user: "keyword",
    password: "keyword@2021",
    database: "keyword"
});

connection.connect();

connection.query("select * from issuekeyword limit 1", (error, rows, fields) => {
    if( error ) throw error;
    console.log("User info is: ", rows);
});

connection.end();