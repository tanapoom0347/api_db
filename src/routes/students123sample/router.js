const express = require('express');
const router = express.Router();
const db = require('../../controllers/students123sample/queries');

router.get('/', db.getStudents);
router.post('/', db.createStudent);
router.get('/:id', db.getStudentById);

module.exports = router;