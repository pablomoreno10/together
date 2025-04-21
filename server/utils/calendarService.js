const { google } = require('googleapis');

const auth = new google.auth.JWT(
  process.env.GCAL_CLIENT_EMAIL,
  null,
  process.env.GCAL_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/calendar']
);


//Calendar client!
const calendar = google.calendar({ version: 'v3', auth });

//Takes in the details from the event a captain creates, and turns in into the format Google Calendar API needs to work.
const createGoogleCalendarEvent = async ({ title, location, date, notes }) => {
  const event = {
    summary: title,
    location,
    description: notes,
    start: {
      dateTime: new Date(date).toISOString(),
      timeZone: 'America/New_York',
    },
    end: {
      dateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
      timeZone: 'America/New_York',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: process.env.GCAL_ID,
      resource: event,
    });
    //console.log("Google Calendar response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Google Calendar insert failed:", err.message);
    throw err;
  }
};


module.exports = { createGoogleCalendarEvent };