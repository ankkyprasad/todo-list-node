const express = require("express");
const router = express.Router();

const Todo = require("../model/Todo");
const auth = require("../util/auth");

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ author: req.id });

    return res.status(200).json({
      title: "success",
      todos,
    });
  } catch (err) {
    res.status(400).json({
      title: "error",
      error: err.message,
    });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTodo = new Todo({
      title,
      completed,
      author: req.id,
    });

    await newTodo.save();

    res.status(200).json({
      title: "successfully added",
      todo: newTodo,
    });
  } catch (err) {
    res.status(400).json({
      title: "error",
      error: err.message,
    });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, author: req.id });

    todo.completed = req.body.completed;
    await todo.save();

    res.json({
      title: "todo updated",
      todo,
    });
  } catch (err) {
    res.status(400).json({
      title: "error",
      error: err.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, author: req.id });
    res.json({
      title: "todo deleted",
    });
  } catch (err) {
    res.status(400).json({
      title: "error",
      error: err.message,
    });
  }
});

module.exports = router;
