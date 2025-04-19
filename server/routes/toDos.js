//modular routes to keep app more organized
const { protected } = require('../middleware/authMiddleware');
const { createToDo, getToDo } = require('../controllers/toDoController');
const express = require('express');
const router = express.Router();


router.post('/create', protected, createToDo);
router.get('/get', protected, createToDo);


module.exports = router;