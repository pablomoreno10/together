import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [nextEvent, setNextEvent] = useState(null);
  const [attending, setAttending] = useState(false);
  const [attendingCount, setAttendingCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/next`, { headers });
        const event = res.data;
        setNextEvent(event);
        setAttendingCount(event.attending.length);
        setAttending(event.attending.includes(getUserIdFromToken(token))); // helper below
      } catch (err) {
        console.error("Error loading event:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [token]);

  const handleAttend = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${nextEvent._id}/attend`,
        {},
        { headers }
      );

      const msg = res.data.message;
      const count = res.data.attendingCount;

      setAttendingCount(count);
      setAttending(msg.includes("attending"));
    } catch (err) {
      console.error("Error toggling attendance:", err.message);
    }
  };

  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id;
    } catch {
      return null;
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Event */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Next Event</h2>
          {nextEvent ? (
            <>
              <p className="text-lg font-bold">{nextEvent.title}</p>
              <p><strong>Date:</strong> {new Date(nextEvent.date).toLocaleString()}</p>
              <p><strong>Location:</strong> {nextEvent.location}</p>
              <p><strong>Notes:</strong> {nextEvent.notes || '—'}</p>
              <p><strong>Attending:</strong> {attendingCount}</p>

              <button
                onClick={handleAttend}
                className={`mt-4 px-4 py-2 rounded ${
                  attending ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white font-semibold`}
              >
                {attending ? "Not Going ❌" : "I'm Going ✅"}
              </button>
            </>
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>

        {/* To-Do List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
          {todos.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {todos.map(todo => (
                <li key={todo._id}>{todo.text}</li>
              ))}
            </ul>
          ) : (
            <p>No to-dos available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
