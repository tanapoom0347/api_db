const express = require('express');
const router = express.Router();
const {
    get
} = require('../../controllers/product003/queries');
router.get('/', get);
module.exports = router;