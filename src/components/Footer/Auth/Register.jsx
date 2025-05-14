import React, { useState } from 'react';
import Button from '../../../tools/Button';
import RegisterModal from './RegisterModal';

function Register({ onRegister }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleRegisterSuccess = (user) => {
    if (onRegister) {
      onRegister(user);
    }
    setIsOpen(false);
  };
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Register</Button>
      <RegisterModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onRegisterSuccess={handleRegisterSuccess} 
      />
    </>
  );
}

export default Register;