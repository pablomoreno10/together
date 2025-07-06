const Todo = require('../models/todo');
const mongoose = require('mongoose');

const createToDo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const { id: createdBy, role, teamId} = req.user;

    if (role !== 'captain') {
      return res.status(401).json({ message: 'Sorry, only captains can create To Dos.' });
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      createdBy,
      teamId
    });

    res.status(201).json({ todo });
  } catch (err) {
    console.error('Error creating todo:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getToDo = async (req, res) => {
  try {
    const todos = await Todo.find().populate('completedBy', 'name').sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    console.error('Get ToDo Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteToDo = async (req, res) => {
  try {

    const { id } = req.params;
    const { role } = req.user;

    if (role !== 'captain') {
      return res.status(401).json({ message: 'Sorry, only captains can create To Dos.' });
    }

    const todo = await Todo.findById(id);

    if(!todo){
      return res.status(404).json({ message: 'To-Do not found' });
    }

    await todo.deleteOne();

    res.status(200).json({ message: 'To-Do deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleToDoCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    const hasCompleted = todo.completedBy.includes(userId);

    if (hasCompleted) {
      todo.completedBy = todo.completedBy.filter(uid => uid.toString() !== userId);
    } else {
      todo.completedBy.push(userId);
    }

    await todo.save();

    const updatedTodo = await Todo.findById(id).populate('completedBy', 'name');

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error('Toggle completion error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createToDo, getToDo, deleteToDo, toggleToDoCompletion };
