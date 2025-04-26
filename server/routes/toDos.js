//modular routes to keep app more organized
const { protected } = require('../middleware/authMiddleware');
const { createToDo, getToDo, deleteToDo, toggleToDoCompletion  } = require('../controllers/toDoController');
const express = require('express');
const router = express.Router();

router.post('/create', protected, createToDo);       
router.get('/get', protected, getToDo);            
router.delete('/:id', protected, deleteToDo);
router.patch('/:id/complete', protected, toggleToDoCompletion);

module.exports = router;