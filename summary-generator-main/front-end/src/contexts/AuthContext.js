// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (via cookie)
    const fetchUser = async () => {
      try {
        const response = await API.get('/auth/me');  // Example endpoint to get current user
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      await API.post('/auth/login', credentials); // sets cookie in browser
      const userRes = await API.get('/auth/me');   // get user data after login
      setUser(userRes.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      await API.post('/auth/signup', userData);  // user created and cookie set
      const userRes = await API.get('/auth/me');
      setUser(userRes.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');  // clears cookie on server
    } catch (error) {
      console.warn('Logout failed:', error.message);
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await API.put('/auth/profile', profileData);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
