const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getRootFolders,
  getFolderContent,
  createFolder,
} = require('../controllers/folder.controller');

const { createFolderValidation } = require('../validations/folder.validation');
const validateRequest = require('../middleware/validateRequest');
const { updateFolder, deleteFolder } = require('../controllers/folder.controller');

router.get('/viewstore', protect, getRootFolders);
router.get('/viewstore/:folderId', protect, getFolderContent);
// router.post('/folders', protect, createFolder);

router.post('/folders', protect, createFolderValidation, validateRequest, createFolder);

router.put('/folders/:id', protect, updateFolder);
router.delete('/folders/:id', protect, deleteFolder);


module.exports = router;
