const express = require('express');
const router = express.Router();
const {
    getHandler,
    postHandler,
    patchHandler,
    deleteHandler
} = require('../../controllers/product003/queries');
router.get('/', getHandler);
router.post('/', postHandler);
router.patch('/:id', patchHandler);
router.delete('/:id', deleteHandler);
module.exports = router;