//next step-> Componentization, should have done that at first

import { useEffect, useState } from 'react'; 
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.jsx';
import EventCard from '../components/EventCard.jsx';
import CreateEventForm from '../components/CreateEventForm.jsx';
import CreateTodoForm from '../components/CreateTodoForm.jsx';
import TodoList from '../components/TodoList.jsx';

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

  const isCaptain = getUserRoleFromToken(token) === 'captain';

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
          dueDate: dueDate,
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
        {/* Left: Event */}
        <div className="flex-1 space-y-4">
          {isCaptain && !showEventForm && (
            <button onClick={() => setShowEventForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              + Create Event
            </button>
          )}

          {isCaptain && showEventForm && (
            <CreateEventForm
              onSubmit={handleEventSubmit}
              onCancel={() => setShowEventForm(false)}
              title={title}
              setTitle={setTitle}
              location={location}
              setLocation={setLocation}
              date={date}
              setDate={setDate}
              notes={notes}
              setNotes={setNotes}
            />
          )}

          <EventCard
            nextEvent={nextEvent}
            attending={attending}
            attendingCount={attendingCount}
            toggleAttendance={toggleAttendance}
          />
        </div>


        <div className="flex-1 space-y-4">
          {/* Create To-Do Button */}
            {isCaptain && !showTodoForm && (
              <button
                onClick={() => setShowTodoForm(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                + Create To-Do
              </button>
            )}

            {/* To-Do Form */}
            {isCaptain && showTodoForm && (
              <CreateTodoForm
                onSubmit={handleTodoSubmit}
                onCancel={() => setShowTodoForm(false)}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                dueDate={dueDate}
                setDueDate={setDueDate}
              />
            )}

            <TodoList todos={todos} />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;