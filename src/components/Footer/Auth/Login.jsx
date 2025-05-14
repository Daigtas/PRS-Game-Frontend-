import React, { useState } from 'react';
import Button from '../../../tools/Button';
import LoginModal from './LoginModal';

function Login({ currentUser, onLogin, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };
  
  return (
    <>
      {currentUser ? (
        <Button onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button onClick={() => setIsOpen(true)}>Login</Button>
          <LoginModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
            onLogin={onLogin}
          />
        </>
      )}
    </>
  );
}

export default Login;