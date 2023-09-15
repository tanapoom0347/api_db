const conn = require('../../db/db.mysql.config');
const tbl = 'users0001';

const getUsers = (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        conn.query(
            `select * from ${tbl}`,
            (err, results, fields) => {
                res.json(results);
            }
        );
    } else if (id) {
        conn.query(
            `select * from ${tbl} where id = ?`,
            [id],
            (err, results) => {
                if (!err) {
                    if (results.length != 0) {
                        res.json(results);
                    } else {
                        res.json({error: 'fail get'});
                    }
                } else {
                    res.json({error: 'fail get'});
                }
            }
        );
    }
};

module.exports = {
    getUsers
};