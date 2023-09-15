const express = require('express');
const router = express.Router();
const db = require('../../controllers/users0001/queries');

router.get('/', db.getUsers);
// router.get('/id', db.getUserById);

module.exports = router;