import React, { useState } from 'react';
import ChooseButton from './ChooseButton';
import PlayButton from './PlayButton';
import Results from './Results';
import './playBoard.css';

function PlayBoard({ playerChoice, computerChoice, result, updatePlayerChoice, playGame }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [tempComputerChoice, setTempComputerChoice] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handlePlay = () => {
    setIsAnimating(true);
    setShowResults(false);

    let choices = ['rock', 'paper', 'scissors'];
    let interval = setInterval(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setTempComputerChoice(randomChoice);
    }, 100);

    playGame();

    setTimeout(() => {
      clearInterval(interval);
      setTempComputerChoice(computerChoice);
      setIsAnimating(false);

      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }, 1000);
  };

  return (
    <main>
      <div className="game-area">
        <ChooseButton 
          choice={playerChoice} 
          updateChoice={updatePlayerChoice} 
        />
        
        <div className="middle-container">
          {showResults ? <Results result={result} /> : null}
          <PlayButton onPlay={handlePlay} />
        </div>
        
        <div className="choice-container">
          <h3>Computer Choice</h3>
          <div className={`choice-icon computer-choice ${isAnimating ? 'animate' : ''}`}>
            <i className={getIconClass(tempComputerChoice || computerChoice)}></i>
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
