const { body } = require('express-validator');

const createTaskValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('priority').optional().isInt({ min: 1, max: 5 }),
  body('status').optional().isInt({ min: 1, max: 3 }),
  body('due_date').optional().isISO8601().toDate(),
  body('category_id').optional().isInt(),
  body('assigned_user_ids').optional().isArray(),
  body('assigned_user_ids.*').isInt().withMessage('Each assigned user ID must be an integer')
];

module.exports = { createTaskValidator };