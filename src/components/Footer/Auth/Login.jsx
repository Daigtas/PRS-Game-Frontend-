import React, { useState } from 'react';
import Button from '../../../tools/Button';
import LoginModal from './LoginModal';

function Login({ userState, setUserState }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {userState.isLoggedIn ? (
        <Button>
          Logout
        </Button>
      ) : (
        <>
          <Button>Login</Button>
          <LoginModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
            setUserState={setUserState}
          />
        </>
      )}
    </>
  );
}

export default Login;