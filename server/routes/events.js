const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  attendEvent, 
  deleteEvent, 
  updateEvent 
} = require('../controllers/eventController');

const { protected } = require('../middleware/authMiddleware');

router.post('/', protected, createEvent); //Create event
router.get('/', protected, getEvents);   //Get all events
router.patch('/:id/attend', protected, attendEvent); // Attend an event
router.put('/:id', protected, updateEvent); // Update event
router.delete('/:id', protected, deleteEvent); // Delete event

module.exports = router;


