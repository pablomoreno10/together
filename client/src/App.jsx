
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Roster from './pages/Roster';

function App() {
  return (
    <div className="min-h-screen bg-alabaster">
      <header className="bg-espresso text-white p-4">
        <h1 className="text-4xl font-bold text-center">FC Together</h1>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/roster" element={<Roster />} />
      </Routes>
    </div>
  );
}

export default App;