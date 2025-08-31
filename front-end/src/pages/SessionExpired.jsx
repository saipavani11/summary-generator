import React from "react";
import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Session Expired</h1>
      <p className="text-gray-700 mb-6">Your session has expired. Please log in again to continue.</p>
      <Link to="/login">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default SessionExpired;
