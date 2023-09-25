const pool = require('../../db/mysql2pool');
const tbl = 'product003';

const getHandler = (req, res, next) => {
    const id = req.query.id;
    if (id) {
        pool.execute('select * from ' + tbl + ' where id = ? limit 1', [id],
            (err, results, fields) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Not Found' });
                }
                res.json(results);
            });
    } else if (Object.keys(req.query).length === 0) {
        pool.execute('select * from ' + tbl + ' order by createdAt',
            (err, results, fields) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json(results);
            });
    } else {
        res.status(400).json({ error: 'Internal Server Error' });
    }
};

const postHandler = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'Internal Server Error' });
    }
    pool.execute('insert into ' + tbl + '(name, price) values (?, ?)', [name, price],
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(results);
        });
};

const patchHandler = (req, res, next) => {
    const id = req.params.id;
    const newData = req.body;
    if (Object.keys(newData).length === 0) {
        return res.status(400).json({ error: 'Internal Server Error' });
    }
    pool.query('update ?? set ? where id = ?', [tbl, newData, id],
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
};

const deleteHandler = (req, res, next) => {
    const id = req.params.id;
    pool.execute('delete from ' + tbl + ' where id = ?', [id],
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
};

module.exports = {
    getHandler,
    postHandler,
    patchHandler,
    deleteHandler
};