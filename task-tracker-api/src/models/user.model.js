// src/models/user.model.js
const pool = require('../config/db');

/**
 * Create a new user
 * @param {Object} user
 * @param {string} user.name
 * @param {string} user.email
 * @param {string} user.password
 * @returns {Promise<Object>}
 */
const createUser = async ({ name, email, password }) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;
  const values = [name, email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Find a user by email
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
const findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};

module.exports = { createUser, findByEmail };