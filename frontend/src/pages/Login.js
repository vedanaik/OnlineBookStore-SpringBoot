import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      setMessage('Login successful!');
      setTimeout(() => navigate('/catalogue'), 1000);
    } catch (error) {
      setMessage(error.response?.data || 'Login failed!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h2>Login</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;