const { body } = require('express-validator');

exports.createDocumentValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').optional().isString(),
  body('folder').notEmpty().withMessage('Folder ID is required'),
];

exports.addVersionValidation = [
    body('versionNumber')
      .notEmpty()
      .withMessage('Version number is required')
      .matches(/^\d+\.\d+$/)
      .withMessage('Version number must be like 1.0 or 2.1'),
  ];
  