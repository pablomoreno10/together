const express = require('express');
const router = express.Router();
const { protected } = require('../middleware/authMiddleware');
const User = require('../models/users');

router.get('/team', protected, async (req, res) => {

    try {

        teamId = req.user.teamId;
        if (!teamId) {
            return res.status(400).json({ message: 'Team ID is required' });
        }

        const users = await User.find({teamId}).select('name email role');
        res.json(users);

    } catch (err) {
        console.error("Error fetching team members:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;





