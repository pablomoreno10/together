const Todo = require('../models/todo');

const createToDo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const { id: createdBy, role } = req.user;

    if (role !== 'captain') {
      return res.status(401).json({ message: 'Sorry, only captains can create To Dos.' });
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      createdBy,
      createdAt: new Date()
    });

    res.status(201).json({ todo });
  } catch (err) {
    console.error('Error creating todo:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getToDo = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    console.error('Get ToDo Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createToDo, getToDo };
