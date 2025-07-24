import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSessions, createChatSession } from '../api';
import { toast } from 'react-hot-toast';
import { deleteSession } from '../api';

export default function ChatLanding() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getUserSessions();
        setSessions(response.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        toast.error("Failed to load chat sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

const handleCreateSession = async () => {
  if (!newSessionName.trim()) {
    toast.error("Please enter a session name.");
    return;
  }

  try {
    await createChatSession(newSessionName.trim());

    setShowModal(false);
    setNewSessionName('');

    // ✅ Refetch full updated list of sessions
    const sessionsRes = await getUserSessions();
    setSessions(sessionsRes.data);

    toast.success("Session created successfully!");
  } catch (err) {
    console.error("Error creating session:", err);
    toast.error("Failed to create session.");
  }
};

const handleDelete = async (sessionId) => {
  const confirmed = window.confirm("Are you sure you want to delete this session?");
  if (!confirmed) return;

  try {
    await deleteSession(sessionId);
    setSessions((prev) => prev.filter((s) => s._id !== sessionId));
    toast.success("Session deleted.");
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete session.");
  }
};

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-400 mb-6">
          💬 Your Chat Sessions
        </h1>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold shadow-lg"
          >
            ➕ Start New Chat
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-500">No sessions found. Start a new chat!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-gray-900 relative hover:bg-indigo-800 p-5 rounded-xl shadow-md transition cursor-pointer"
                onClick={() => navigate(`/chat/session/${session._id}`)}
              >
                {/* ❌ Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering navigate
                    handleDelete(session._id);
                  }}
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
                  title="Delete session"
                >
                  &times;
                </button>

                <div className="text-lg font-semibold text-indigo-300">
                  🗂️ {session.session_name || `Session ${session._id}`}
                </div>
                <div className="text-sm text-gray-400">
                  Created: {new Date(session.created_at).toLocaleDateString("en-IN")}
                </div>
              </div>
            ))}
        </div>
        )}
      </div>

      {/* 🪄 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4 text-center">
              ✨ Name Your Session
            </h2>
            <input
              type="text"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              placeholder="Enter session name..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-medium text-sm"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
