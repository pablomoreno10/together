const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  attendEvent, 
  deleteEvent,
  getNextEvent, 
  updateEvent, 
  userTrackerEvent
} = require('../controllers/eventController');

const { protected } = require('../middleware/authMiddleware');

router.get('/', protected, getEvents);          
router.post('/', protected, createEvent);       
router.get('/next', protected, getNextEvent);
router.patch('/:id/attend', protected, attendEvent); //Attend/unattend event
router.put('/:id', protected, updateEvent);     
router.delete('/:id', protected, deleteEvent);   
router.get('/:id/tracker', protected, userTrackerEvent);

module.exports = router;


