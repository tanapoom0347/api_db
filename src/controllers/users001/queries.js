const mysql = require('mysql2');
const { db_config } = require('../../db/db.mysql.config');
const tbl = 'users0001';

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

const getUsers = (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        connection.query(
            `select * from ${tbl}`,
            (err, results, fields) => {
                res.json(results);
            }
        );
    } else if (id) {
        connection.query(
            `select * from ${tbl} where id = ?`,
            [id],
            (err, results) => {
                if (!err) {
                    if (results.length != 0) {
                        res.json(results);
                    } else {
                        res.json({ error: 'unknown' });
                    }
                } else {
                    res.json({ error: 'unknown' });
                }
            }
        );
    }
};

module.exports = {
    getUsers
};