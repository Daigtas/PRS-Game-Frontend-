import React from 'react';
import ChooseButton from './ChooseButton';
import PlayButton from './PlayButton';
import Results from './Results';

function PlayBoard({ playerChoice, computerChoice, result, updatePlayerChoice, playGame }) {
  return (
    <main>
      <div className="game-area">
        <ChooseButton 
          choice={playerChoice} 
          updateChoice={updatePlayerChoice} 
        />
        
        <div className="middle-container">
          <Results result={result} />
          <PlayButton onPlay={playGame} />
        </div>
        
        <div className="choice-container">
          <h3>Computer Choice</h3>
          <div className="choice-icon computer-choice">
            <i className={getIconClass(computerChoice)}></i>
          </div>
        </div>
      </div>
    </main>
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

export default PlayBoard;
