//modular routes to keep app more organized
const { registerUser, loginUser } = require('../controllers/authController');
const express = require('express');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;