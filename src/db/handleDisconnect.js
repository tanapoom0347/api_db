const { conn } = require('./db.mysql.config');

function handleDisconnect() {
    conn.connect(function(err) {
      if(err) {
        console.log('error when connecting to conn:', err);
        setTimeout(handleDisconnect, 2000);
      }
    });
    conn.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }

  module.exports = handleDisconnect;