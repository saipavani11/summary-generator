// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FreeDashboard from './pages/FreeDashboard';
import AuthDashboard from './pages/AuthDashboard';
import SummaryResult from './pages/SummaryResult';
import History from './pages/History';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Summarizer from './pages/Summarizer';
import ChatLanding from './pages/ChatLanding';
import ChatSession from './pages/ChatSession';
import Navbar from './components/navbar';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <Navbar /> {/* Add this here */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freedashboard" element={<FreeDashboard />} />
        <Route path="/authdashboard" element={<AuthDashboard />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/chatlanding" element={<ChatLanding />} />
        <Route path="/chat/session/:sessionId" element={<ChatSession />} />
        <Route path="/result" element={<SummaryResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
