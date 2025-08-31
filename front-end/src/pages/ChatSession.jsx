import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSessionChats, sendChatMessage, getUserSessions } from "../api";
import { toast } from "react-hot-toast";
import { useSpellChecker } from "../hooks/useSpellChecker";
import { DateTime } from "luxon";

export default function ChatSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const fileInputRef = useRef(null);

  const { checkWord, loaded } = useSpellChecker();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getSessionChats(sessionId);
        setMessages(res.data.reverse());

        const sessionsRes = await getUserSessions();
        const currentSession = sessionsRes.data.find((s) => s._id === sessionId);

        if (currentSession) {
          setSessionName(currentSession.session_name || `Session ${sessionId}`);
          setCreatedAt(currentSession.created_at);
        } else {
          setSessionName(`Session ${sessionId}`);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load session data");
      }
    };

    fetchMessages();
  }, [sessionId]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const formData = new FormData();
    formData.append("question", question);
    formData.append("session_id", sessionId);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      const res = await sendChatMessage(formData);
      setMessages((prev) => [res.data, ...prev]);
      setQuestion("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.log(err.message || err);
      toast.error("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 font-inter">
      {/* New Session Banner */}
      {messages.length === 0 && (
        <div className="bg-yellow-500 text-black px-4 py-3 mb-4 rounded-lg text-center font-medium">
          🎉 New session created! Upload a file or ask a question to get started.
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-400 hover:text-indigo-200 text-sm"
        >
          ← Back to Sessions
        </button>
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-indigo-300">{sessionName}</h2>
          {createdAt && (
            <p className="text-sm text-gray-500">
            Created: {new Date(createdAt).toLocaleDateString("en-IN")}
            </p>
          )}
        </div>
        <div></div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Chat Feed */}
        <div className="md:col-span-2 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet. Ask a question to begin.</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded-xl">
                <div className="text-sm text-indigo-400 font-medium mb-1">
                  Q: {msg.question}
                </div>
                <div className="text-gray-200">A: {msg.answer}</div>
              </div>
            ))
          )}
        </div>

        {/* Uploaded Files */}
        <div className="bg-gray-900 p-4 rounded-xl h-full overflow-y-auto">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">
            📎 Uploaded Files
          </h3>
          {messages.filter((m) => m.file_name).length === 0 ? (
            <p className="text-red-400 text-sm font-medium">
              ⚠️ You have to upload at least one file to ask questions.
            </p>
          ) : (
            <ul className="text-sm text-indigo-200 space-y-2">
              {messages
                .filter((m) => m.file_name)
                .map((m, i) => (
                  <li key={i}>📄 {m.file_name}</li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Ask Input */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question..."
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

          {/* Spellcheck suggestion */}
          {loaded && question.trim() && (() => {
            const words = question.trim().split(/\s+/);
            const lastWord = words[words.length - 1];
            const spellResult = checkWord(lastWord);

            return !spellResult.correct ? (
              <div className="mt-1 text-sm text-red-400">
                ⚠️ Did you mean: <span className="font-semibold">{spellResult.suggestions.join(", ") || "No suggestions"}</span>?
              </div>
            ) : null;
          })()}
        </div>

        <div className="relative">
          <input
            type="file"
            accept=".pdf,.txt,.docx,.mp3,.wav,.m4a"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white text-sm cursor-pointer"
          >
            {file ? `📎 ${file.name}` : "Upload File"}
          </button>
        </div>


        <button
          onClick={handleSend}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-white"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
