// src/pages/Landing.jsx
import PlanCard from '../components/PlanCard';
import { Link } from 'react-router-dom';
import {
  FileText, Volume2, Bot, Globe, History, User
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans">
      
      {/* 🌟 Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-400 leading-tight mb-4">
          Your AI-Powered Study Companion
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Upload files, summarize, and ask questions with powerful AI tools tailored for learning.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/freedashboard">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
              Try Now
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* ✨ Features Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }, idx) => (
          <div key={idx} className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-sm">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center mb-4">
              {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        ))}
      </section>

      {/* 🧾 Plan Comparison */}
      <section className="bg-gray-950 py-20 border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-300 mb-10">
          Choose Your Access Level
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
          <PlanCard
            title="Free Model"
            features={[
              "Summarize PDF/Text",
              "No login required",
            ]}
            button={
              <Link to="/freedashboard">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
                  Try Now
                </button>
              </Link>
            }
          />
          <PlanCard
            title="Authenticated Model"
            features={[
              "Summarize PDF/Text/Audio/URL",
              "Unlimited chat with files",
              "Access history & sessions",
              "Faster responses",
            ]}
            button={
              <Link to="/login">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition w-full">
                  Login
                </button>
              </Link>
            }
          />
        </div>
      </section>
    </div>
  );
}

// 💎 Feature List
const features = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Summarize Files",
    description: "Get concise summaries from PDFs or text instantly.",
  },
  {
    icon: <Volume2 className="w-5 h-5" />,
    title: "Audio Summarization",
    description: "Upload voice notes or lectures for instant summaries.",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Chat with Documents",
    description: "Ask follow-up questions about your uploaded content.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "URL Summarization",
    description: "Paste any article link and get a neat summary.",
  },
  {
    icon: <History className="w-5 h-5" />,
    title: "Session History",
    description: "Revisit previous summaries and questions anytime.",
  },
  {
    icon: <User className="w-5 h-5" />,
    title: "Profile Dashboard",
    description: "Track your usage and manage your files efficiently.",
  },
];
