const {getTodoCompletionTimeline}  =  require('../controllers/graphController.js');
const { protected } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/stats/completionTimeline', protected, getTodoCompletionTimeline);

module.exports = router;


