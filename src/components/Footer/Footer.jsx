import React from 'react';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Reset from './Reset';
import Rules from './Rules/Rules';

function Footer({ resetGame, userState, setUserState }) {
  return (
    <div className="buttons">
      <Reset resetGame={resetGame} />
      <Rules />
      <Login userState={userState} setUserState={setUserState} />
      <Register userState={userState} setUserState={setUserState} />
    </div>
  );
}

export default Footer;
