import React, { useState } from 'react';
import Modal from '../../../tools/Modal';
import Button from '../../../tools/Button';

// API base URL - change this to match your Flask server
const API_URL = 'http://localhost:5000';

function RegisterModal({ isOpen, onClose, onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Register the user
      const registerResponse = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.error || 'Registration failed');
      }

      // If registration successful, login automatically
      const loginResponse = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error('Registration successful but auto-login failed. Please log in manually.');
      }

      // Registration and login successful
      if (onRegisterSuccess) {
        onRegisterSuccess({ 
          id: loginData.user_id, 
          username: username,
          isLoggedIn: true
        });
      }
      
      // Reset form and close modal
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      onClose();

    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register">
      <form onSubmit={handleSubmit} className="register-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="register-username">Username:</label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-actions">
          <Button type="primary" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default RegisterModal;
