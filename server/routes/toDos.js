//modular routes to keep app more organized
const { protected } = require('../middleware/authMiddleware');
const { createToDo, getToDo, deleteToDo, toggleToDoCompletion  } = require('../controllers/toDoController');
const express = require('express');
const router = express.Router();

router.get('/', protected, getToDo);             
router.post('/', protected, createToDo);         
router.patch('/:id/complete', protected, toggleToDoCompletion); 
router.delete('/:id', protected, deleteToDo);    

module.exports = router;