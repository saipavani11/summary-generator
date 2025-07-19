// src/pages/SignupPage.js
import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

function SignupPage() {
  const { setCurrentPage, showNotification } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/signup', form);
      showNotification('Signup successful! Please login.');
      setCurrentPage('login');
    } catch (err) {
      showNotification(err.response?.data?.detail || 'Signup failed', 'error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up for DocuMind</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={() => setCurrentPage('login')}>Login</button>
      </p>
    </div>
  );
}

export default SignupPage;