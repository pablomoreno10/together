import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamId, setTeamId] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        name,
        email,
        password,
        teamId,
        role
      });

      console.log("Register success", res.data); 

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Register failed", err); 
      setError(err.response?.data?.message || 'Registration failed');
    }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg- p-6 rounded shadow-md w-80 space-y-4 border-4 border-double border-wine"
      >
        <h2 className="text-3xl font-bold text-espresso mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Rutgers Email"
          className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          required
        />
        <input
          type="text"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Team Name"
          className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          required
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Player Role (e.g., player, captain)"
          className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          required
        />
        <button
          type="submit"
          className="w-full bg-wine hover:bg-espresso text-white py-2 rounded transition duration-200"
        >
          Register
        </button>
        <p className="text-sm text-center">
          Already have an account? <a href="/" className="text-wine font-semibold hover:underline">Log In</a>
        </p>
      </form>
    </div>
  );
}

export default Register;