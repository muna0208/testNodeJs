const mysql = require('mysql');
const dbconfig = require('./database.js');
let pool = mysql.createPool(dbconfig);

function getConnection(callback){
    pool.getConnection(function (err, conn){
        if( !err ){
            callback(conn);
        }
    });
}

module.exports = getConnection;