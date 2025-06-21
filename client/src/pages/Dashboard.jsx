//next step-> Componentization, should have done that at first

import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.jsx';

function Dashboard() {
  const [nextEvent, setNextEvent] = useState(null);
  const [attending, setAttending] = useState(false);
  const [attendingCount, setAttendingCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEventForm, setShowEventForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id;
    } catch {
      return null;
    }
  };

  const getUserRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/next`, { headers });
        const event = res.data;
        setNextEvent(event);
        setAttendingCount(event.attending?.length || 0);
        setAttending(event.attending?.includes(getUserIdFromToken(token)) || false);
      } catch (err) {
        console.error("Error loading event:", err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/todos`, { headers });
        setTodos(res.data);
      } catch (err) {
        console.error("Error loading todos:", err.message);
      }
    };

    fetchTodos();
    fetchNextEvent();
  }, [token]);

 const toggleAttendance = async () => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/events/${nextEvent._id}/attend`,
      {},
      { headers }
    );

    const { attendingCount, attending } = res.data; 

    setAttendingCount(attendingCount);
    setAttending(attending); 

    setNextEvent((prev) => ({
      ...prev,
      attending: attending 
    }));
  } catch (err) {
    console.error("Error toggling attendance:", err.message);
  }
};

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`,
        { title, location, date, notes },
        { headers }
      );
      setShowEventForm(false);
      window.location.reload();
    } catch (err) {
      console.error('Error creating event:', err.message);
    }
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos`,
        {
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDate || null,
        },
        { headers }
      );
      setTitle('');
      setDescription('');
      setDueDate('');
      setShowTodoForm(false);
      window.location.reload();
    } catch (err) {
      console.error('Error creating todo:', err.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
            <DashboardHeader />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side (Event section only) */}
<div className="flex-1 space-y-4">
  {/* Create Event Button */}
  {getUserRoleFromToken(token) === 'captain' && !showEventForm && (
    <button
      onClick={() => setShowEventForm(true)}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      + Create Event
    </button>
  )}

  {/* Event Form */}
  {getUserRoleFromToken(token) === 'captain' && showEventForm && (
    <form onSubmit={handleEventSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="w-full p-2 border"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-2 border"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create</button>
        <button type="button" onClick={() => setShowEventForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
      </div>
    </form>
  )}

  {/* Next Event Card */}
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-2">Next Event</h2>
    {nextEvent ? (
      <>
        <p className="text-lg font-bold">{nextEvent.title}</p>
        <p><strong>Date:</strong> {new Date(nextEvent.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {nextEvent.location}</p>
        <p><strong>Notes:</strong> {nextEvent.notes || '—'}</p>
        <p><strong>Attending:</strong> {attending ? attendingCount : attendingCount - 1}</p>
        <button
          onClick={toggleAttendance}
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
</div>

        {/* Right side (To-Do List + Button) */}
  <div className="flex-1 space-y-4">
    {/* Create To-Do Button */}
    {getUserRoleFromToken(token) === 'captain' && !showTodoForm && (
      <button
        onClick={() => setShowTodoForm(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        + Create To-Do
      </button>
    )}

    {/* To-Do Form */}
    {getUserRoleFromToken(token) === 'captain' && showTodoForm && (
      <form onSubmit={handleTodoSubmit} className="bg-white p-4 rounded shadow space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create</button>
          <button type="button" onClick={() => setShowTodoForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </form>
    )}

    {/* To-Do List */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
      {Array.isArray(todos) && todos.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.title}
              <ul><li>{todo.description}</li></ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No to-dos available for now.</p>
      )}
    </div>
  </div>
  </div>
      </div>
    );
  }

export default Dashboard;

