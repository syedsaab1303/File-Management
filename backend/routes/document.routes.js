const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getVersions,
  addVersion,
} = require('../controllers/document.controller');

const { filterDocuments } = require('../controllers/document.controller');
const { getTotalDocuments } = require('../controllers/document.controller');

const { createDocumentValidation, addVersionValidation } = require('../validations/document.validation');
const validateRequest = require('../middleware/validateRequest');

//router.post('/documents', protect, createDocument);
router.post('/documents', protect, createDocumentValidation, validateRequest, createDocument);

router.get('/documents/:id', protect, getDocumentById);
router.put('/documents/:id', protect, updateDocument);
router.delete('/documents/:id', protect, deleteDocument);

router.get('/documents/:id/versions', protect, getVersions);
//router.post('/documents/:id/version', protect, addVersion);
router.post('/documents/:id/version', protect, addVersionValidation, validateRequest, addVersion);


router.get('/filter', protect, filterDocuments);

router.get('/total-documents', protect, getTotalDocuments);

module.exports = router;
