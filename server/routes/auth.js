//modular routes to keep app more organized
const { registerUser } = require('../controllers/authController');
const express = require('express');
const router = express.Router();


router.post('/register', registerUser);

module.exports = router;