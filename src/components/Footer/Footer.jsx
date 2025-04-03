import React from 'react';
import Reset from './Reset';
import Rules from './Rules/Rules';
import Button from '../../tools/Button';
import './footer.css';

function Footer() {
  return (
    <div className="buttons">
      <Reset/>
      <Rules />
      <Button>Login</Button>
      <Button>Logout</Button>

    </div>
  );
}

export default Footer;
