import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io(import.meta.env.VITE_BACKEND_URL); 
function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState(null); 
  const [teamId, setTeamId] = useStSate(null); 

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(data);
      setTeamId(data.team); 
      socket.emit('joinRoom', data.team);
    };

    fetchUser();

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (text.trim() === '') return;
    const messageData = {
      sender: user.name,
      text,
      team: teamId,
      time: new Date().toLocaleTimeString()
    };
    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, messageData]);
    setText('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Team Chat</h2>
      <div className="border rounded p-4 h-96 overflow-y-scroll bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold">{msg.sender}: </span>
            <span>{msg.text}</span>
            <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
