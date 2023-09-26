const express = require('express');
const router = express.Router();
const {
    getAll,
    getById,
    post,
    put,
    deleteById
} = require('../../controllers/product003/queries');
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', post);
router.put('/:id', put);
router.delete('/:id', deleteById);
module.exports = router;