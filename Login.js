// /components/Login.js
import React, { useState } from 'react';
import '../index.css'; // Adjust path

function Login() {
  const [accountType, setAccountType] = useState('admin');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleAccountType = (type) => setAccountType(type);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in as ${accountType}:\nEmail: ${formData.email}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Choose Account Type</h2>
        <div className="account-types">
          <div className={`account-option ${accountType === 'admin' ? 'selected' : ''}`} onClick={() => handleAccountType('admin')}>
            <img src="https://img.icons8.com/ios-filled/100/businessman.png" alt="Admin" />
            <span>Admin</span>
          </div>
          <div className={`account-option ${accountType === 'student' ? 'selected' : ''}`} onClick={() => handleAccountType('student')}>
            <img src="https://img.icons8.com/ios/100/student-male.png" alt="Student" />
            <span>Student</span>
          </div>
        </div>

        <p className="welcome-text">
          Hello {accountType}!<br />Please fill out the form below to get started
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password <span className="forgot">Forgot?</span></label>
            <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <p className="signup-text">No account? <a href="/signup">Signup</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
