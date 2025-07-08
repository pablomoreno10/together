import { Link } from "react-router-dom";

function DashboardHeader() {
  return (
    <nav className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
      <h1 className="text-xl font-bold">Team Links</h1>
      <div className="flex space-x-4">
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
    </nav>
  );
}

export default DashboardHeader;