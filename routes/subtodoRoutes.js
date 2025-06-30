const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const { createSubtodo, getAllSubtodos, getSubtodosByFolder, getSingleSubtodo, updateSubtodo, deleteSubtodo,  
} = require('../controllers/subtodoController');

router.use(verify);

router.post('/', createSubtodo);
router.get('/', getAllSubtodos);
router.get('/folder/:folderId', getSubtodosByFolder);
router.get('/:id', getSingleSubtodo);
router.put('/:id', updateSubtodo);
router.delete('/:id', deleteSubtodo);

module.exports = router;
