import React from 'react';
import Reset from './Reset';
import Rules from './Rules/Rules';
import Button from '../../tools/Button';

function Footer({ resetGame, userState, setUserState }) {
  return (
    <div className="buttons">
      <Reset resetGame={resetGame} />
      <Rules />
      <Button>Login</Button>
      <Button>Register</Button>
    </div>
  );
}

export default Footer;
