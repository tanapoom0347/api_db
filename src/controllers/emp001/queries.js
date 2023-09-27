const pool = require('../../db/mysql2pool');
const tbl = 'emp001';
module.exports = {
    get: (req, res) => {
        pool.query('select * from ?? order by updatedAt', [tbl],
            (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(rows);
            });
    },
    getById: (req, res) => {
        const id = req.params.id;
        pool.query('select * from ?? where id = ? limit 1', [tbl, id],
            (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                if (results.length === 0) return res.status(404).json({ error: 'Internal Server Error' });
                res.json(rows[0]);
            });
    },
    post: (req, res) => {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) return res.status(400).json({ error: 'Internal Server Error' });
        pool.query('insert into ??(name, email, phone) values (?, ?, ?)', [tbl, name, email, phone],
            (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(rows);
            });
    },
    patch: (req, res) => {
        const id = req.params.id;
        const newData = req.body;
        pool.query('update ?? set ? where id = ?', [tbl, newData, id],
            (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(rows);
            });
    },
    delete: (req, res) => {
        const id = req.params.id;
        pool.query('delete from ?? where id = ?', [tbl, id],
            (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                if (results.affectedRows === 0) return res.status(404).json({ error: 'Internal Server Error' });
                res.json(rows);
            });
    }
};