// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

const {loadEnvFile} = require('node:process');

loadEnvFile('./.env.test')

// Create a connection pool
var pool = mariadb.createPool({
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
  multipleStatements : true,
  connectionLimit : 5
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});