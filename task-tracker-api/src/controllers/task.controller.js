const { validationResult } = require("express-validator");
const pool = require("../config/db");

/**
 * CREATE TASK
 */
const createTask = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      priority = 2,
      status = 1,
      due_date,
      category_id
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks
      (title, description, priority, status, due_date, category_id, user_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        title,
        description,
        priority,
        status,
        due_date,
        category_id,
        req.user.id
      ]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0]
    });

  } catch (error) {

    console.error("Create task error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


/**
 * GET ALL TASKS
 */
const getTasks = async (req, res) => {

  try {

    const result = await pool.query(
      `SELECT * FROM tasks
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      status: "success",
      data: result.rows
    });

  } catch (error) {

    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/**
 * GET SINGLE TASK
 */
const getTask = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM tasks WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0]
    });

  } catch (error) {

    console.error("Get task error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/**
 * UPDATE TASK
 */
const updateTask = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      description,
      priority,
      status,
      due_date
    } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title=$1,
           description=$2,
           priority=$3,
           status=$4,
           due_date=$5,
           updated_at=NOW()
       WHERE id=$6
       RETURNING *`,
      [
        title,
        description,
        priority,
        status,
        due_date,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0]
    });

  } catch (error) {

    console.error("Update task error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/**
 * DELETE TASK
 */
const deleteTask = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM tasks WHERE id=$1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {

    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
};