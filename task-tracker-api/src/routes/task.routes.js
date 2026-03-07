// src/routes/task.routes.js
const express = require('express');
const router = express.Router();
const { createTask, validateTask, authenticate } = require('../controllers/task.controller');

router.post('/', authenticate, validateTask, createTask);

module.exports = router;