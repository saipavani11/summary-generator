// src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

// ---------- AUTH ----------
export const loginUser = ({ username, password }) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return API.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const signupUser = (data) => API.post('/auth/register', data);

export const logoutUser = () => {
  const token = localStorage.getItem("token");

  return API.post('/auth/logout', {}, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true,
  });
};

// ---------- SUMMARIZATION ----------
export const summarizeContent = async ({ file, raw_text }) => {
  const formData = new FormData();
  if (file) formData.append('file', file);
  if (raw_text) formData.append('raw_text', raw_text);

  const token = localStorage.getItem("token");

  return API.post('/summarize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true,
  });
};

export const summarizeURL = async (url) => {
  const token = localStorage.getItem("token");

  return API.post(
    '/summarize/url',
    { url },
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      withCredentials: true,
    }
  );
};

export const summarizeAudio = async (audioFile) => {
  const formData = new FormData();
  formData.append('file', audioFile);

  const token = localStorage.getItem("token");

  return API.post('/summarize-audio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });
};

// ---------- CHAT SESSION ----------
export const getUserSessions = () => {
  const token = localStorage.getItem("token");

  return API.get('/chat/chat/user-sessions', {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true,
  });
};

export const createChatSession = (session_name = "", file_name = null) => {
  const token = localStorage.getItem("token");

  return API.post(
    '/chat/new-session',
    JSON.stringify({ session_name, file_name }),
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      withCredentials: true,
    }
  );
};

export const sendChatMessage = (data) => {
  const token = localStorage.getItem("token");

  return API.post('/chat/chat', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true,
  });
};

export const getSessionChats = async (sessionId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await API.get(`/chat/session/${sessionId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("❌ Error fetching session chats:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSession = async (sessionId) => {
  const token = localStorage.getItem("token");

  return API.delete(`/chat/session/${sessionId}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true,
  });
};

// ---------- FREE DASHBOARD ----------
export const uploadFile = async (formData) => {
  const token = localStorage.getItem("token");

  return API.post('/summarize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });
};
