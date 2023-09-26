const pool = require('../../db/mysql2pool');
const tbl = 'product003';

const getAll = (req, res, next) => {
    pool.execute('select * from ' + tbl + ' order by createdAt',
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
};

const getById = (req, res, next) => {
    const id = req.params.id;
    pool.execute('select * from ' + tbl + ' where id = ? limit 1', [id],
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Internal Server Error' });
            } else {
                res.json(results[0]);
            }
        });
};

const post = (req, res, next) => {
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

const put = (req, res, next) => {
    const id = req.params.id;
    const { name, price } = req.body;
    pool.execute('update ' + tbl + ' set `name` = ?, `price` = ? where id = ?', [name, price, id],
        (err, results, fields) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
};

const deleteById = (req, res, next) => {
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
    getAll,
    getById,
    post,
    put,
    deleteById
};