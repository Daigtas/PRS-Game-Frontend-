import React from 'react';
import PlayerName from './PlayerName';

function ChooseButton({ choice, updateChoice }) {
  const choices = ['rock', 'paper', 'scissors'];
  
  const cycleChoice = () => {
    const currentIndex = choice ? choices.indexOf(choice) : -1;
    const nextIndex = (currentIndex + 1) % choices.length;
    updateChoice(choices[nextIndex]);
  };
  
  return (
    <div className="choice-container">
      <PlayerName />
      <h3>Your Choice</h3>
      <div 
        className={`choice-icon player-choice ${choice ? 'active' : ''}`}
        onClick={cycleChoice}
      >
        <i className={getIconClass(choice)}></i>
      </div>
    </div>
  );
}

function getIconClass(choice) {
  switch (choice) {
    case 'rock':
      return 'fas fa-hand-rock';
    case 'paper':
      return 'fas fa-hand-paper';
    case 'scissors':
      return 'fas fa-hand-scissors';
    default:
      return 'fas fa-question';
  }
}

export default ChooseButton;