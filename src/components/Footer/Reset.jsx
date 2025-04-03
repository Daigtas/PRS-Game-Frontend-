import React from 'react';
import Button from '../../tools/Button';
function Reset({ resetGame }) {
  return (
    <Button onClick={resetGame}>Reset</Button>
  );
}

export default Reset;
