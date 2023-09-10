const pool = require('../../db/db.config');
const tbl = 'users123sample_tbl';

exports.getUsers = (req, res, next) => {
    pool.query(
        `select * from ${tbl} order by id`,
        (err, results, fields) => {
            if (results.rowCount === 0) {
                res.json({ message: 'No entries found' });
            } else {
                const map = results.rows.map(row => {
                    return {
                        name: row.name,
                        email: row.email,
                        _id: row.id
                    }
                });
                // res.json(results.rows);
                res.json({
                    count: results.rows.length,
                    users: map
                });
            }
        }
    );
};

exports.getUserById = (req, res, next) => {
    const id = req.params.id;

    pool.query(
        `select * from ${tbl} where id = $1`,
        [id],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: 'Invalid Id' });
            } else if (results.rowCount == 0) {
                res.status(500).json({ error: 'Id Not Found' });
            } else {
                res.json({ 
                    name: results.rows[0].name,
                    email: results.rows[0].email,
                    _id: id
                });
            }
        }
    );
};

exports.createUser = (req, res, next) =>{
    const { name, email } = req.body;

    pool.query(`
        SELECT setval(pg_get_serial_sequence('${tbl}', 'id')
        , COALESCE(max(id) + 1, 1)
        , false)
        FROM "${tbl}"`,
        (err, results, fields) => {
            pool.query(
                `insert into ${tbl} (name, email) values ($1, $2) returning *`,
                [name, email],
                (err, results, fields) => {
                    if (err) {
                        res.status(500).json({ error: err.detail });
                    } else {
                        res.status(201).json({
                            massage: 'Created user successfully',
                            insertId: results.rows[0].id,
                            detail: {
                                name: results.rows[0].name,
                                email: results.rows[0].email
                            }
                        });
                    }
                }
            );
        }
    );
};

exports.updateUser = (req, res, next) =>{
    const id = req.params.id;
    const { name, email } = req.body;

    pool.query(
        `update ${tbl} SET name = $1, email = $2 WHERE id = $3 returning *`,
        [name, email, id],
        (err, results, fields) => {
            if (err) {
                if (err.detail) {
                    res.status(500).json({ error: err.detail });
                } else {
                    res.status(500).json({ error: 'Invalid Id' });
                }
                
            } else if (results.rowCount === 0) {
                    res.status(500).json({ error: 'Invalid Id' });
            } else {
                res.json({
                    massage: 'User updated',
                    id: id,
                    info: {
                        name: results.rows[0].name,
                        email: results.rows[0].email
                    }
                });
            }
        }
    );
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;

    pool.query(
        `delete from ${tbl} where id = $1`,
        [id],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (results.rowCount === 0) {
                res.status(500).json({ error: 'Invalid Id' });
            } else {
                res.json({ message: `Deleted user id: ${id} successfully` });
            }
        }
    );
};