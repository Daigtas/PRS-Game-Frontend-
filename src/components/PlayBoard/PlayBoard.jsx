import React, { useState, useEffect } from 'react';
import ChooseButton from './ChooseButton';
import PlayButton from './PlayButton';
import Results from './Results';
import './playBoard.css';

function PlayBoard({ playerChoice, computerChoice, result, updatePlayerChoice, playGame, currentUser }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [tempComputerChoice, setTempComputerChoice] = useState(null);
  const [showResults, setShowResults] = useState(false);
    useEffect(() => {
    if (!isAnimating && computerChoice) {
      setTempComputerChoice(computerChoice);
    }
  }, [computerChoice, isAnimating]);
  
  // Ensure the computer choice is correctly displayed after animation stops
  useEffect(() => {
    if (!isAnimating && computerChoice) {
      // Small delay to ensure state is in sync
      const timer = setTimeout(() => {
        setTempComputerChoice(computerChoice);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, computerChoice]);
  
  const handlePlay = () => {
    if (!playerChoice) {
      alert("Please choose Rock, Paper, or Scissors first!");
      return;
    }
    
    setIsAnimating(true);
    setShowResults(false);

    let choices = ['rock', 'paper', 'scissors'];
    let interval = setInterval(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setTempComputerChoice(randomChoice);
    }, 100);    setTimeout(() => {
      clearInterval(interval);
      playGame();
      setIsAnimating(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <main>
      <div className="game-area">
        <ChooseButton 
          choice={playerChoice} 
          updateChoice={updatePlayerChoice}
          currentUser={currentUser}
        />
          <div className="middle-container">
          {showResults ? <Results result={result} /> : <div className="result-placeholder">VS</div>}
          <PlayButton onPlay={handlePlay} />
        </div>
          <div className="choice-container">
          <h3>Computer Choice</h3>
          <div className={`choice-icon computer-choice ${isAnimating ? 'animate' : ''}`}>
            <i className={getIconClass(isAnimating ? tempComputerChoice : computerChoice)}></i>
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
