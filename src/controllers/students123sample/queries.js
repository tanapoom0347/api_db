const pool = require('../../db/db.config');
const tbl = 'students123sample_tbl';

exports.getStudents = (req, res, next) => {
    pool.query(`select * from ${tbl} order by id`,
        (err, results, fields) => {
            if (results.rowCount === 0) {
                res.json({ message: 'No entries found' });
            } else {
                const map = results.rows.map(row => {
                    return {
                        name: row.name,
                        course: row.course,
                        email: row.email,
                        phone: row.phone,
                        _id: row.id
                    }
                });
                // res.json(results.rows);
                // res.json(map);
                res.json({
                    count: results.rows.length,
                    students: map
                });
            }
        }
    );
};

exports.createStudent = (req, res, next) => {
    const { name, course, email, phone } = req.body;

    pool.query(`
        SELECT setval(pg_get_serial_sequence('${tbl}', 'id')
        , COALESCE(max(id) + 1, 1)
        , false)
        FROM "${tbl}"`,
        (err, results, fields) => {
            pool.query(
                `insert into ${tbl} (name, course, email, phone) values ($1, $2, $3, $4)`,
                [name, course, email, phone],
                (err, results, fields) => {
                    if (err) {
                        res.status(500).json({ error: 'fail insert' });
                    } else {
                        res.status(201).json({ massage: 'Inserted successfully',});
                    }
                }
            );
        }
    );
};

exports.getStudentById = (req, res, next) => {
    const id = req.params.id;

    pool.query(
        `select * from ${tbl} where id = $1`,
        [id],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: 'Invalid Id' });
            } else if (results.rowCount == 0) {
                res.status(500).json({ error: 'Invalid Id' });
            } else {
                res.json({ 
                    name: results.rows[0].name,
                    course: results.rows[0].course,
                    email: results.rows[0].email,
                    phone: results.rows[0].phone,
                    _id: results.rows[0].id
                });
            }
        }
    );
};