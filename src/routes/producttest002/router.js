const express = require('express');
const router = express.Router();
const db = require('../../controllers/producttest002/quries');

router.get('/', db.getAll);
router.get('/:id', db.getById);
router.post('/', db.add);
router.put('/:id', db.edit);
router.delete('/:id', db.delete);

module.exports = router;