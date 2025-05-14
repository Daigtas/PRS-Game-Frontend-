import React from 'react';
import './HistoryList.css';

const HistoryList = ({ history }) => {
  // Display latest games first
  const sortedHistory = [...history].sort((a, b) => b.zaidimas - a.zaidimas);

  const getChoiceDisplay = (choice) => {
    switch (choice) {
      case 'rock':
        return <span className="rock">Rock</span>;
      case 'paper':
        return <span className="paper">Paper</span>;
      case 'scissors':
        return <span className="scissors">Scissors</span>;
      default:
        return choice;
    }
  };

  const getResultDisplay = (winner) => {
    switch (winner) {
      case 'zaidejas':
        return <span className="you-won">You won!</span>;
      case 'pc':
        return <span className="pc-won">PC won!</span>;
      case 'tie':
        return <span className="tie">Tie!</span>;
      default:
        return <span>Unknown</span>;
    }
  };

  return (
    <div className="history-list">
      {sortedHistory.length > 0 ? (
        sortedHistory.map((game) => (
          <div key={game.zaidimas} className="history-item">
            <span className="game-number">#{game.zaidimas}:</span> {getChoiceDisplay(game.zaidejas)} vs {getChoiceDisplay(game.pc)} - {getResultDisplay(game.laimetojas)}
          </div>
        ))
      ) : (
        <div className="no-history">No games played yet</div>
      )}
    </div>
  );
};

export default HistoryList;