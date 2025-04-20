const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const validateRequest = require('../middleware/validateRequest');

// router.post('/register', registerUser);
// router.post('/login', loginUser);
router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);

module.exports = router;
