import React, { useEffect, useState } from 'react';
import Main from './components/Main';
import './styles/main.css';

function App() {
  const [gameState, setGameState] = useState({
    playerChoice: null,
    computerChoice: null,
    gameCount: 0,
    result: null,
    history: [],
    scores: { zaidejas: 0, pc: 0 }
  });

  useEffect(() => {
      const storedHistory = localStorage.getItem('istorija');
      const storedScores = localStorage.getItem('taskai');

      if (storedHistory && storedScores) {
        const historyData = JSON.parse(storedHistory);
        const scoresData = JSON.parse(storedScores);
        
        setGameState(prevState => ({
          ...prevState,
          gameCount: historyData.length > 0 ? historyData[historyData.length - 1].zaidimas : 0,
          history: historyData,
          scores: {
            zaidejas: scoresData.find(item => item.zaidejas !== undefined)?.zaidejas || 0,
            pc: scoresData.find(item => item.pc !== undefined)?.pc || 0
          }
        }));

      };
  }, []);

  const updatePlayerChoice = (choice) => {
    setGameState(prevState => ({
      ...prevState,
      playerChoice: choice,
      result: 'VS'
    }));
  };

  const playGame = () => {
    if (!gameState.playerChoice) return;

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = determineWinner(gameState.playerChoice, computerChoice);
    const newGameCount = gameState.gameCount + 1;
    
    const newScores = { ...gameState.scores };
    if (winner === 'zaidejas') {
      newScores.zaidejas++;
    } else if (winner === 'pc') {
      newScores.pc++;
    }

    const historyItem = {
      zaidimas: newGameCount,
      zaidejas: gameState.playerChoice,
      pc: computerChoice,
      laimetojas: winner
    };

    const newHistory = [...gameState.history, historyItem];
    localStorage.setItem('istorija', JSON.stringify(newHistory));
    localStorage.setItem('taskai', JSON.stringify([{zaidejas: newScores.zaidejas}, {pc: newScores.pc}]));
    

    setGameState({
      ...gameState,
      computerChoice,
      gameCount: newGameCount,
      result: winner,
      history: newHistory,
      scores: newScores
    });
  };

  const resetGame = () => {
    localStorage.setItem('istorija', JSON.stringify([]));
    localStorage.setItem('taskai', JSON.stringify([{zaidejas: 0}, {pc: 0}]));
    
    setGameState({
      playerChoice: null,
      computerChoice: null,
      gameCount: 0,
      result: 'VS',
      history: [],
      scores: { zaidejas: 0, pc: 0 }
    });
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return 'tie';
    }
    
    if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'zaidejas';
    }
    
    return 'pc';
  };

  return (
    <div className="app">
    <Main 
      gameState={gameState}
      updatePlayerChoice={updatePlayerChoice}
      playGame={playGame}
      resetGame={resetGame}
    />
    </div>
  );
}

export default App;
