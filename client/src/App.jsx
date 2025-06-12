
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Roster from './pages/Roster';

function App() {
  console.log("App loaded");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <h1>Testing if App shows</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/roster" element={<Roster />} />
      </Routes>
    </div>
  );
}

export default App;