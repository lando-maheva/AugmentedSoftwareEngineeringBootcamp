// src/utils/token.util.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate a JWT token
 * @param {Object} payload
 * @returns {string} JWT
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verify a JWT token
 * @param {string} token
 * @returns {Object} decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };