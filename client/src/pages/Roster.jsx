import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.jsx';


function Roster() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/team`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching team roster:', err.message);
      }
    };

    fetchTeam();
  }, [token]);

  return (
  <div className="min-h-screen bg-gray-50 p-6">
    <DashboardHeader />
    <h1 className="text-2xl font-bold mb-4">Team Roster</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-600 break-all">{user.email}</p>
          </div>
          <span
            className={`mt-2 self-start px-3 py-1 text-sm rounded-full ${
              user.role === 'captain'
                ? 'bg-wine text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {user.role === 'captain' ? 'Captain' : 'Member'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

}

export default Roster;
