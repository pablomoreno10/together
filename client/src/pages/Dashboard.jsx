import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.jsx';
import EventCard from '../components/EventCard.jsx';
import CreateEventForm from '../components/CreateEventForm.jsx';
import CreateTodoForm from '../components/CreateTodoForm.jsx';
import TodoList from '../components/TodoList.jsx';
import { getTokenPayload } from '../utils/Auth';

function Dashboard() {
  const [nextEvent, setNextEvent] = useState(null);
  const [attending, setAttending] = useState(false);
  const [attendingCount, setAttendingCount] = useState(0);
  const [attendeeList, setAttendeeList] = useState([]);

  const [todos, setTodos] = useState([]);

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

  const payload = getTokenPayload(token);
  const isCaptain = payload?.role === 'captain';

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/next`, { headers });
        const event = res.data;
        setNextEvent(event);
        setAttendingCount(event.attending?.length || 0);
        setAttending(event.attending?.includes(payload?.id) || false);
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

  useEffect(() => {
    const fetchAttendeeNames = async () => {
      if (!nextEvent?._id) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/${nextEvent._id}/tracker`, { headers });
        setAttendeeList(res.data.attending);
      } catch (err) {
        console.error('Error fetching attendee list:', err.message);
      }
    };

    fetchAttendeeNames();
  }, [nextEvent]);

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
        attending: attending,
      }));
    } catch (err) {
      console.error("Error toggling attendance:", err.message);
    }
  };

  const toggleTodoCompletion = async (todoId) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/todos/${todoId}/complete`,
      {},
      { headers }
    );

    const updatedTodo = res.data;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  } catch (err) {
    console.error('Error toggling todo completion:', err.message);
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

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`, { headers });
      window.location.reload();
    } catch (err) {
      console.error("Error deleting event:", err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/todos/${id}`, { headers });
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err.message);
    }
  };

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
            attendeeList={attendeeList}
            toggleAttendance={toggleAttendance}
            isCaptain={isCaptain}
            onDelete={handleDeleteEvent}
          />
        </div>

        <div className="flex-1 space-y-4">
          {isCaptain && !showTodoForm && (
            <button
              onClick={() => setShowTodoForm(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              + Create To-Do
            </button>
          )}

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

          <TodoList
            todos={todos}
            isCaptain={isCaptain}
            onDelete={handleDeleteTodo}
            toggleTodoCompletion={toggleTodoCompletion}
            userId={payload?.id}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
