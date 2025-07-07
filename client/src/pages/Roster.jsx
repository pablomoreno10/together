import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Footer from '../components/Footer.jsx';


function Roster() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/team`, {
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
      <DashboardHeader/>
      <h1 className="text-2xl font-bold mb-4">Team Roster</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user._id} className="py-2 flex justify-between">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <span
                className={`px-2 py-1 text-sm rounded ${
                  user.role === 'captain'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {user.role === 'captain' ? 'Captain' : 'Member'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Roster;
