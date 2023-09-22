const { pool } = require('../../db/mysql2promise');
const tbl = 'producttest002';

module.exports = {
    getAll: async (req, res) => {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute('select * from producttest002');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (connection) connection.release();
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(`SELECT * FROM ${tbl} WHERE id = ?`, [id]);
            if (rows.length === 0) {
                res.status(404).json({ error: 'Internal Server Error' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (connection) connection.release();
        }
    },
    add: async (req, res) => {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: 'Internal Server Error' });
        }
        let connection;
        try {
            connection = await pool.getConnection();
            const result = await connection.execute(`INSERT INTO ${tbl} (name, price) VALUES (?, ?)`, [name, price]);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (connection) connection.release();
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        const { name, price } = req.body;
        let connection;
        try {
            connection = await pool.getConnection();
            const result = await connection.execute(`UPDATE ${tbl} SET name = ?, price = ? WHERE id = ?`, [name, price, id]);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (connection) connection.release();
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        let connection;
        try {
            connection = await pool.getConnection();
            const result = await connection.execute(`DELETE FROM ${tbl} WHERE id = ?`, [id]);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (connection) connection.release();
        }
    }
};