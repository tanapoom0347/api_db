const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

let connection;

function connect() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'api_db',
  });
};

function handleDisconnect() {
  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Reconnecting to MySQL...');
      connect();
    } else {
      throw err;
    }
  });
};

const db = new Sequelize('api_db', 'root', 'admin', {
  host: "localhost",
  dialect: "mysql"
});

module.exports = {
  init() {
    connect();
    handleDisconnect();

    // Start a timer to keep the connection alive by executing a simple query every minute
    setInterval(() => {
      connection.query('SELECT 1');
    }, 60000);
  },
  getConnection() {
    if (!connection) {
      throw new Error('Database connection not established.');
    }
    return connection;
  },
  db
};