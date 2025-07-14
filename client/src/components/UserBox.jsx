import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenPayload } from '../utils/Auth';

function UserBox() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const payload = getTokenPayload(localStorage.getItem('token'));
  const name = payload?.name || 'User';



  const handleLogout = () => {
    localStorage.removeItem('token'); //remove token from local storage for proper user log out, It was unsatisfying to logout without a proper button
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-wine font-semibold px-3 py-1 border border-wine rounded hover:bg-pewter hover:text-white transition"
      >
        {"Sign Out, Player: " + name}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-wine hover:text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserBox;
