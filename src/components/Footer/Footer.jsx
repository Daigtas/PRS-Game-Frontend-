import React from 'react';
import Reset from './Reset';
import Rules from './Rules/Rules';

function Footer({ resetGame, userState, setUserState }) {
  return (
    <div className="buttons">
      <Reset resetGame={resetGame} />
      <Rules />
    </div>
  );
}

export default Footer;
