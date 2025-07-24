import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionChats, sendChatMessage } from '../services/api';

export default function ChatRoom() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getSessionChats(sessionId);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error('Failed to load chat messages', err);
      }
    };

    fetchChats();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await sendChatMessage({ session_id: sessionId, message: input });
      setMessages(prev => [...prev, { user: 'You', message: input }, { user: 'AI', message: res.data.response }]);
      setInput('');
    } catch (err) {
      alert('Failed to send message.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Left Chat Panel */}
      <div className="w-2/3 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-indigo-400 mb-4">Chat with AI</h2>

        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`p-3 rounded-lg max-w-lg ${msg.user === 'You' ? 'bg-indigo-700 self-end' : 'bg-gray-800 self-start'}`}>
              <p className="text-sm text-gray-300">{msg.user}</p>
              <p className="text-base text-white mt-1 whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>

      {/* Right File Panel */}
      <div className="w-1/3 bg-gray-900 p-6 border-l border-gray-800">
        <h3 className="text-lg font-semibold text-indigo-300 mb-4">📁 Session File</h3>
        {!file ? (
          <>
            <input
              type="file"
              accept=".pdf,.txt,.docx,.mp3,.wav,.m4a,.ogg"
              id="file-upload"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
            >
              Upload File
            </label>
          </>
        ) : (
          <div className="text-sm text-indigo-300">
            Uploaded: <span className="font-medium">{file.name}</span>
            <button onClick={() => setFile(null)} className="ml-2 text-red-400 hover:text-red-600">✖</button>
          </div>
        )}
      </div>
    </div>
  );
}
