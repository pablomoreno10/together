const Event = require('../models/events');
const User = require('../models/users');

const { createGoogleCalendarEvent } = require('../utils/calendarService');

const createEvent = async (req, res) => {

    try{
        const {title, location, date, notes} = req.body;
        const { id: createdBy, role } = req.user;
        
        if (role !== 'captain'){
            return res(401).json({message: 'Sorry, only captains are authorized to create events.'})
        };
        const event = await Event.create({
            title,
            location,
            date,
            notes,
            createdBy,
            createdAt: new Date()
        });
        
        try{
          //console.log("Attempting to create Google Calendar event...");
          //This will not only create and store the event inside MongoDB but also create it inside Google Calendar simultaneously.
          await createGoogleCalendarEvent({
            title,
            location,
            date,
            notes
          });
          //console.log("Google Calendar event successfully created");
        }catch(err){
          console.log('Error creating event in Google Calendar', err.message);
        }
        
        res.status(201).json({ event });

    }catch(err){
        console.log("Error creating event", err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getEvents = async (req, res) => { 
    try{
        const event = await Event.find().sort({ createdAt: -1 });
        res.status(200).json({event});
    }catch(err){
        console.log("Get event error", err.message);
        res.status(500).json({ message: 'Server error' });
    }
 };

 const attendEvent = async (req, res) => {
    try {

      const { id } = req.params; 
      const { id: userId } = req.user;
  
      const event = await Event.findById(id);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
    
      const isUserAttending = event.attending.includes(userId);

      if (isUserAttending){
        event.attending = event.attending.filter(uid => uid.toString() !== userId);
        await event.save();

        return res.status(200).json({message: "User is no longer attending the event", attendingCount: event.attending.length});
      }else{

        event.attending.push(userId);
        await event.save();

        return res.status(200).json({message: "User is attending the event", attendingCount: event.attending.length});

      }
      
    } catch (err) {
      console.error("Attend Event Error", err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

const deleteEvent = async (req, res) => { 
    try{
        const {id} = req.params;
        const {role} = req.user;

        if (role !== 'captain') {
            return res.status(401).json({ message: 'Sorry, only captains can create events.' });
        };

        const event = await Event.findById(id);

        if(!event){
            return res.status(404).json({ message: 'Event not found' });
        };

        await event.deleteOne();

        res.status(200).json({ message: 'Event deleted successfully' });
    }catch(err){
        console.error('Error deleting event:', err.message);
        return res.status(500).json({ message: 'Server error' });
    }
 };

const updateEvent = async (req, res) => { 
    try{
        
        const {id} = req.params;

        const{role} = req.user;

        if (role !== 'captain') {
            return res.status(401).json({ message: 'Sorry, only captains can update events.' });
        };

        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
          });

          if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
          }
      
          res.status(200).json(updatedEvent);
      
      }catch (err) {
          console.error('Update event error:', err.message);
          res.status(500).json({ message: 'Server error', error: err.message });
      }
};

const userTrackerEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamId } = req.user; 

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const allUsers = await User.find({ teamId }, 'name email'); 


    //Let's turn attending into a set to then use has which results in an O(1) search instead of a linear search!

    const attendingSet = new Set(event.attending.map(id => id.toString()));

    const attending = [];
    const notAttending = [];

    allUsers.forEach(user => {
      if (attendingSet.has(user._id.toString())) {
        attending.push(user);
      } else {
        notAttending.push(user);
      }
    });

    res.status(200).json({ attending, notAttending });

  } catch (err) {
    console.error('Error getting attendees:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createEvent, getEvents, attendEvent, deleteEvent, updateEvent, userTrackerEvent };