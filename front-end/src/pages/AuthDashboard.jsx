import { Link } from "react-router-dom";

export default function AuthDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-400">
          Welcome to Your AI Workspace
        </h1>
        <p className="text-lg md:text-xl text-gray-300 text-center mb-16">
          Choose how you want to engage with your content.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* All-in-One Summarizer */}
          <Link to="/summarizer">
            <div className="group bg-gray-900 hover:bg-indigo-800 transition p-10 rounded-3xl shadow-xl cursor-pointer text-center">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-white text-indigo-300">
                📄 Summarize Any Content
              </h2>
              <p className="text-gray-400 group-hover:text-white">
                Generate AI-powered summaries for PDF, Word, Text, Audio, or even Web URLs — all in one place.
              </p>
            </div>
          </Link>

          {/* AI Chat Assistant */}
          <Link to="/ChatLanding">
            <div className="group bg-gray-900 hover:bg-green-800 transition p-10 rounded-3xl shadow-xl cursor-pointer text-center">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-white text-green-300">
                💬 AI Chat Assistant
              </h2>
              <p className="text-gray-400 group-hover:text-white">
                Ask questions and interact with your uploaded documents in a smart, session-based chat interface.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
