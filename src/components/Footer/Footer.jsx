import React from 'react';
import Reset from './Reset';
import Rules from './Rules/Rules';
import Login from './Auth/Login';
import Register from './Auth/Register';
import './footer.css';

function Footer({ resetGame, currentUser, onLogin, onLogout }) {
  const handleReset = () => {
    if (resetGame) resetGame();
  };

  const handleRegister = (user) => {
    if (onLogin) onLogin(user);
  };

  return (
    <div className="buttons">
      <Reset onClick={handleReset} />
      <Rules />
      <Login 
        currentUser={currentUser} 
        onLogin={onLogin} 
        onLogout={onLogout} 
      />
      {!currentUser && (
        <Register onRegister={handleRegister} />
      )}
    </div>
  );
}

export default Footer;
