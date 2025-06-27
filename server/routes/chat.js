const express = require('express');
const router = express.Router();
const {protected} = require('../middleware/authMiddleware');
const Message = require('../models/chat');


router.get('/:teamId', protected, async (req, res) => {
    try {
        const teamId = req.params.teamId;

        if(!teamId){
            return res.status(400).json({teamId: 'Team is required.'})
        }

        const messages = await Message.find({teamId})
            .populate('sender', 'name')
            .sort({timestamp: 1});

        
        res.json(messages);

    } catch (err){
        console.error('Error fetching chat messages:', err.message);
        res.status(500).json()

    }

});

module.exports = router;