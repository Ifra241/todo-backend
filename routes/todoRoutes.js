const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const {createFolder,getAllFolders,getFolderById,updateFolder,deleteFolder
} = require('../controllers/todoFolderController');

router.use(verify);

router.post('/', createFolder);
router.get('/', getAllFolders);
router.get('/:id', getFolderById);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

module.exports = router;
