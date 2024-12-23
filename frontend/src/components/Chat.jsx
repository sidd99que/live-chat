import 'react';
import PropTypes from 'prop-types';

const Chat = ({
  connectionStatus,
  messages,
  message,
  setMessage,
  handleSendMessage,
  username,
  setUsername,
  userJoined,
  handleJoin,
}) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="p-4 bg-blue-500 text-white text-center rounded-t-lg">
        <h1 className="text-2xl">Live Chat</h1>
        <p>{connectionStatus}</p>
      </div>

      {/* Messages Container */}
      <div className="flex-grow p-4 overflow-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.username ? 'bg-blue-100' : 'bg-gray-200'
              }`}
            >
              <strong>{msg.username ? msg.username : 'System'}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800 rounded-b-lg">
        {!userJoined ? (
          <div>
            <input
              type="text"
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleJoin}
              className="w-full py-2 bg-blue-600 text-white rounded-lg"
            >
              Join Chat
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-3 mr-2 border border-gray-300 rounded-lg"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-600 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes validation for the component props
Chat.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  userJoined: PropTypes.bool.isRequired,
  handleJoin: PropTypes.func.isRequired,
};

export default Chat;
