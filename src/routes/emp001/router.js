const express = require('express');
const router = express.Router();
const db = require('../../controllers/emp001/queries');
router.get('/', db.get);
router.get('/:id', db.getById);
router.post('/', db.post);
router.patch('/:id', db.patch);
router.delete('/:id', db.delete);
module.exports = router;