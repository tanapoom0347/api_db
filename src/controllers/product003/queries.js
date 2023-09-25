const pool = require('../../db/mysql2pool');
const tbl = 'product003';

const get = (req, res, next) => {
    const id = req.query.id;
    if (id) {
        pool.execute('select * from ' + tbl + ' where id = ? limit 1', [id],
            (err, results, fields) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Internal Server Error' });
                }
                res.json(results);
            });
    }
    pool.execute('select * from ' + tbl + ' order by createdAt desc',
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
};

module.exports = {
    get
};