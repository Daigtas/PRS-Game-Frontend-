import React from 'react';
import Button from '../../tools/Button';
import './playBoard.css';

function PlayButton({ onPlay }) {
  return (
    <Button 
    type="primary" 
    onClick={onPlay}
    className="play-btn"
    >
      Play
    </Button>
  );
}

export default PlayButton;
