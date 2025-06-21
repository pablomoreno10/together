import { Link } from "react-router-dom";

function DashboardHeader() {
  return (
    <nav className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
      <h1 className="text-xl font-bold">Team Dashboard</h1>
      <div className="flex space-x-4">
        <Link to="/roster" className="text-blue-600 hover:underline">Roster</Link>
        <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
        <Link to="/chat" className="text-blue-600 hover:underline">Chat</Link>
        <a
          href="https://calendar.google.com/calendar/u/0?cid=ZGZjZmQzOTBhY2JiMmNhOTZmOTQ1NjQzMjg2OTljODdiZDVkZTcyZmNhNjRkNGQyMzljMzhmMjYxZDBjODc1YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Calendar
        </a>
      </div>
    </nav>
  );
}

export default DashboardHeader;