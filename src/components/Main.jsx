import React, { useState, useEffect } from "react";
import Footer from './Footer/Footer';
import Header from './Header/Header';
import PlayBoard from './PlayBoard/PlayBoard';
import ScoreBoard from './ScoreBoard/ScoreBoard';

const Main = ({ 
  gameState, 
  updatePlayerChoice, 
  playGame, 
  resetGame,
  currentUser,
  setCurrentUser,
  onLogin,
  onLogout
}) => {
  const [scoreUpdateTrigger, setScoreUpdateTrigger] = useState(0);
  
  // Update trigger when gameState changes
  useEffect(() => {
    setScoreUpdateTrigger(prev => prev + 1);
  }, [gameState.scores, gameState.history]);
  return (
    <div className="container">
      <Header currentUser={currentUser} />      <ScoreBoard 
        scores={gameState.scores}
        history={gameState.history}
        currentUser={currentUser}
        updateTrigger={scoreUpdateTrigger}
      />
      <PlayBoard 
        playerChoice={gameState.playerChoice}
        computerChoice={gameState.computerChoice}
        result={gameState.result}
        updatePlayerChoice={updatePlayerChoice}
        playGame={playGame}
        currentUser={currentUser}
      />
      <Footer 
        resetGame={resetGame}
        currentUser={currentUser}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    </div>
  );
};

export default Main;