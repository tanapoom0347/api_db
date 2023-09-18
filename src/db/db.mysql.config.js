const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'api_db'
});

const db = new Sequelize('api_db', 'root', 'admin', {
  host: "localhost",
  dialect: "mysql"
});

module.exports = {
  conn,
  db
};