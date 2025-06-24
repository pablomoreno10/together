function EventCard({ nextEvent, attending, attendingCount, toggleAttendance, isCaptain, onDelete }) {
  if (!nextEvent) return <p>No upcoming events.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Next Event</h2>
      <p className="text-lg font-bold">{nextEvent.title}</p>
      <p><strong>Date:</strong> {new Date(nextEvent.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {nextEvent.location}</p>
      <p><strong>Notes:</strong> {nextEvent.notes || '—'}</p>
      <p><strong>Attending:</strong> {attendingCount}</p>

      {/* List of attendees (Optional future feature) */}
      {Array.isArray(nextEvent.attending) && nextEvent.attending.length > 0 && (
        <div className="mt-2 text-sm text-gray-700">
          <strong>Attendees:</strong> {nextEvent.attending.join(', ')}
        </div>
      )}

      <button
        onClick={toggleAttendance}
        className={`mt-4 px-4 py-2 rounded ${
          attending ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } text-white font-semibold`}
      >
        {attending ? "Not Going ❌" : "I'm Going ✅"}

      </button>

     {isCaptain && (
        <button
          onClick={() => onDelete(nextEvent._id)}
          className="mt-2 ml-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          Delete Event 🗑️
        </button>
      )}

    </div>
  );
}

export default EventCard;
