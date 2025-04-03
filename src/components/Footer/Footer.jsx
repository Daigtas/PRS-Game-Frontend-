import React from 'react';
import Reset from './Reset';
import Rules from './Rules/Rules';
import Button from '../../tools/Button';
import './footer.css';

function Footer({ resetGame, userState, setUserState }) {
  return (
    <div className="buttons">
      <Reset resetGame={resetGame} />
      <Rules />
      <Button>Login</Button>
      <Button>Logout</Button>

    </div>
  );
}

export default Footer;
