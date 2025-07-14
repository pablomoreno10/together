import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow mb-6 p-4 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-espresso">Team Links</h1>

        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-pewter hover:underline">Dashboard</Link>
          <Link to="/roster" className="text-pewter hover:underline">Roster</Link>
          <Link to="/chat" className="text-pewter hover:underline">Chat</Link>
          <a
            href="https://calendar.google.com/calendar/u/0?cid=ZGZjZmQzOTBhY2JiMmNhOTZmOTQ1NjQzMjg2OTljODdiZDVkZTcyZmNhNjRkNGQyMzljMzhmMjYxZDBjODc1YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pewter hover:underline"
          >
            Calendar
          </a>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="text-pewter" /> : <Menu className="text-pewter" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <Link to="/dashboard" className="text-pewter hover:underline" onClick={toggleMenu}>Dashboard</Link>
          <Link to="/roster" className="text-pewter hover:underline" onClick={toggleMenu}>Roster</Link>
          <Link to="/chat" className="text-pewter hover:underline" onClick={toggleMenu}>Chat</Link>
          <a
            href="https://calendar.google.com/calendar/u/0?cid=ZGZjZmQzOTBhY2JiMmNhOTZmOTQ1NjQzMjg2OTljODdiZDVkZTcyZmNhNjRkNGQyMzljMzhmMjYxZDBjODc1YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pewter hover:underline"
          >
            Calendar
          </a>
        </div>
      )}
    </nav>
  );
}

export default DashboardHeader;

