//modular routes to keep app more organized
const { protected } = require('../middleware/authMiddleware');
const { createToDo, getToDo, deleteToDo  } = require('../controllers/toDoController');
const express = require('express');
const router = express.Router();

router.post('/create', protected, createToDo);
router.get('/get', protected, getToDo);
router.delete('/:id', protected, deleteToDo);

module.exports = router;