import React from 'react';
import HistoryList from './HistoryList';
import TitleBar from './TitleBar';
import './gameHistory.css';

function GameHistory({ history, currentUser }) {
  return (
    <div className="game-history">
      <TitleBar />
      {currentUser ? (
        <HistoryList history={history} />
      ) : (
        <p>Log in to see your game history.</p>
      )}
    </div>
  );
}

export default GameHistory;
