import React from 'react';
import HistoryList from './HistoryList';
import TitleBar from './TitleBar';
import './gameHistory.css';

function GameHistory({ history }) {
  return (
    <div className="game-history">
      <TitleBar />
      <HistoryList history={history} />
    </div>
  );
}

export default GameHistory;
