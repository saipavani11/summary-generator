import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTitleClick = () => {
    if (location.pathname === '/freedashboard') {
      navigate('/');
    } else if (isAuthenticated) {
      navigate('/authdashboard');
    } else {
      navigate('/');
    }
  };

  const showLogout =
    isAuthenticated && location.pathname === '/authdashboard';

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg text-white">
      <h1
        className="text-2xl font-extrabold tracking-wide text-purple-400 cursor-pointer hover:text-purple-300 transition duration-200"
        onClick={handleTitleClick}
      >
        Clarity AI
      </h1>
      {showLogout && (
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 shadow-md"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
