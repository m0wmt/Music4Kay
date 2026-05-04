// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
    host: '127.0.0.1', 
    port: 3306,
    user: 'sheetmusicuser', 
    password: 'pasword',
    database: 'test',
    multipleStatements: true,
    connectionLimit: 5
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});