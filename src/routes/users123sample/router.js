const express = require('express');
const router = express.Router();
const db = require('../../controllers/users123sample/queries');

router.get('/', db.getUsers);
router.get('/:id', db.getUserById);
router.post('/', db.createUser);
router.put('/:id', db.updateUser);
router.delete('/:id', db.deleteUser);


module.exports = router;