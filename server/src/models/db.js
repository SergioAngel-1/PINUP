const { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_USER } = require("../config");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

module.exports = connection;
