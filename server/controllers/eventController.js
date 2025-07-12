const Event = require('../models/events');
const User = require('../models/users');
const nodemailer = require('nodemailer');

const { createGoogleCalendarEvent } = require('../utils/calendarService');

const createEvent = async (req, res) => {

    try{
        const {title, location, date, notes} = req.body;
        const { id: createdBy, role, teamId} = req.user; //Add teamId to the destructured user object
        
        if (role !== 'captain'){
            return res(401).json({message: 'Sorry, only captains are authorized to create events.'})
        };
        const event = await Event.create({
            title,
            location,
            date,
            notes,
            createdBy,
            teamId,
        });

        try{
          //This will not only create and store the event inside MongoDB but also create it inside Google Calendar through GCP simultaneously.
          await createGoogleCalendarEvent({
            title,
            location,
            date,
            notes
          });

        }catch(err){
          console.log('Error creating event in Google Calendar', err.message);
        }

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.APP_PASSWD,
            },
        });
        
        const users = await User.find({ teamId }); //find only returns a promise, so we need to await it
        const emails = users.map(user => user.email); //extract emails from the users array, to send emails to all users in the team :)

        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: emails,
          subject: `TOGETHER FC - New Event Created: ${title}`,
          text: `A new event has been created:\n\nTitle: ${title}\nLocation: ${location}\nDate: ${date}\nNotes: ${notes}\n\nPlease check the app or calendar for more details.`
        };

        
        
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent:', info.response);
        } catch (err) {
          console.log('Error sending email:', err.message);
        }

        res.status(201).json({ event });

    }catch(err){
        console.log("Error creating event", err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getNextEvent = async (req, res) => {
  try {
    const { teamId } = req.user;
    console.log('Team ID from user:', teamId);

    const now = new Date();
    console.log('Current server date:', now);

    const nextEvent = await Event.find({ teamId, date: { $gte: now } })
    .sort({ date: 1 })
    .limit(1);


    console.log('Next Event found:', nextEvent);


    if (nextEvent.length === 0) {
      return res.status(404).json({ message: 'No upcoming events found' });
    }

    res.status(200).json(nextEvent[0]);
  } catch (err) {
    console.error('Error fetching next event:', err.message);
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
      const { id: userId} = req.user;
  
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
    const attendingSet = new Set(event.attending.map(id => id.toString()));

    const attending = [];
    const notAttending = [];

    allUsers.forEach(user => {
      const userId = user._id.toString();
      if (attendingSet.has(userId)) {
        attending.push({ name: user.name, email: user.email });
      } else {
        notAttending.push({ name: user.name, email: user.email });
      }
    });

    res.status(200).json({ attending, notAttending });

  } catch (err) {
    console.error('Error getting attendees:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createEvent, getEvents, attendEvent, deleteEvent, updateEvent, userTrackerEvent, getNextEvent};