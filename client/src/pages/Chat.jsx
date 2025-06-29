import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getTokenPayload } from '../utils/Auth'; 
import DashboardHeader from '../components/DashboardHeader.jsx';


const socket = io(import.meta.env.VITE_BACKEND_URL); 

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');
  const { id: userId, name, teamId } = getTokenPayload(token);
  console.log(getTokenPayload(token));


  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    socket.emit('join_room', teamId);

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage); 
      
    };
  }, [teamId]);


  useEffect(() => {
    // Fetch existing messages on load
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/chat/${teamId}`,
          { headers }
        );
        console.log('messages: ', res.data);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages:', err.message);
      }
    };
    fetchMessages();
  }, [teamId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await socket.emit('send_message', {
        teamId,
        senderId: userId,
        text,
      });
      setText('');
    } catch (err) {
      console.error('Failed to send message:', err.message);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <DashboardHeader/>
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-4 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-gray-200 p-2 rounded">
              <p className="text-sm font-semibold">{msg.sender?.name || 'Unknown'}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
