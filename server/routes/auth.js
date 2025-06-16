const { registerUser, loginUser } = require('../controllers/authController');
const { protected } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protected, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = router;