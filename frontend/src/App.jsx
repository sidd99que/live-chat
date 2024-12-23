// App.js

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [userJoined, setUserJoined] = useState(false);

  useEffect(() => {
    // Listen for 'connect' event
    socket.on('connect', () => {
      setConnectionStatus('Connected to server');
      console.log('Successfully connected to server');
    });

    // Handle connection error
    socket.on('connect_error', (error) => {
      console.error('Connection Error: ', error);
      setConnectionStatus('Connection failed');
    });

    // Listen for server messages
    socket.on('message', (data) => {
      console.log('Message received:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for user join notifications
    socket.on('connected', (data) => {
      console.log('Server says:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('message');
      socket.off('connected');
    };
  }, []);

  const handleSendMessage = () => {
    if (message) {
      socket.emit('message', message); // Emit message to server
      setMessage('');
    }
  };

  const handleJoin = () => {
    if (username) {
      socket.emit('join', username); // Emit join event to server with username
      setUserJoined(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="w-full max-w-lg bg-gray-100 p-4 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-4">{connectionStatus}</h1>

        {!userJoined && (
          <div className="mb-4">
            <input
              type="text"
              className="p-2 border rounded-md w-full"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded-md w-full"
              onClick={handleJoin}
            >
              Join Chat
            </button>
          </div>
        )}

        {userJoined && (
          <>
            <div className="mb-4">
              <ul className="max-h-60 overflow-auto">
                {messages.map((msg, index) => (
                  <li key={index} className="bg-gray-200 p-2 mb-2 rounded-md">
                    {msg}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex">
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="ml-2 p-2 bg-blue-500 text-white rounded-md"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
