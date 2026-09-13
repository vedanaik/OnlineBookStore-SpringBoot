import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', { name, email, password });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      // Extract string message cleanly from object response
      const errorMsg = typeof error.response?.data === 'string' 
        ? error.response.data 
        : error.response?.data?.message || 'Registration failed!';
      
      setMessage(errorMsg);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h2>Register</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;