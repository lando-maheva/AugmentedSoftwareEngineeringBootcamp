const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  login
);

module.exports = router;