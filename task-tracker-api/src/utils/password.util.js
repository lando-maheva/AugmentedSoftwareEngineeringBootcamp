// src/utils/password.util.js
const bcrypt = require('bcryptjs');

/**
 * Hash a plain password
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare a plain password with a hashed password
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };