const { body } = require('express-validator');

exports.createFolderValidation = [
  body('name')
    .notEmpty()
    .withMessage('Folder name is required')
    .isLength({ min: 2 })
    .withMessage('Folder name must be at least 2 characters long'),
];
