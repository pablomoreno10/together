function EventCard({ nextEvent, attending, attendingCount, attendeeList, toggleAttendance, isCaptain, onDelete }) {
  if (!nextEvent) return <p>No upcoming events.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Next Event</h2>
      <p className="text-lg font-bold">{nextEvent.title}</p>
      <p><strong>Date:</strong> {new Date(nextEvent.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {nextEvent.location}</p>
      <p><strong>Notes:</strong> {nextEvent.notes || '—'}</p>
      <p><strong>Attending:</strong> {attendingCount} confirmed</p>

      {Array.isArray(attendeeList) && attendeeList.length > 0 && (
        <p><strong>Attendees:</strong> {attendeeList.map(user => user.name).join(', ')}</p>
      )}

      <button
        onClick={toggleAttendance}
        className={`mt-4 px-4 py-2 rounded ${
          attending ? 'bg-wine hover:espresso' : 'bg-pewter hover:pewter-700'
        } text-white font-semibold`}
      >
        {attending ? "Not Going ❌" : "I'm Going ✅"}
      </button>

      {isCaptain && (
        <button
          onClick={() => onDelete(nextEvent._id)}
          className="mt-2 ml-4 px-4 py-2 rounded bg-wine hover:bg-espresso text-white font-semibold"
        >
          Delete Event 🗑️
        </button>
      )}
    </div>
  );
}

export default EventCard;
