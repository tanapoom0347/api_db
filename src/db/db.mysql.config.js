const { Sequelize } = require('sequelize');

const db_config = {
  host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'api_db'
};


const db = new Sequelize('api_db', 'root', 'admin', {
  host: "localhost",
  dialect: "mysql"
});

module.exports = {
  db_config,
  db
};