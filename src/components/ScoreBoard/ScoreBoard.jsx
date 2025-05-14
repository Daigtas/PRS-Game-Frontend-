import React, { useState, useEffect } from "react";
import GameHistory from "./GameHistory/GameHistory";
import GameScores from "./GameScores/GameScores";
import "./ScoreBoard.css";
import API_URL, { getApiHeaders } from '../../config';

const ScoreBoard = ({ scores, history, currentUser, updateTrigger }) => {
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        console.log('Fetching highscores from server...');
        const response = await fetch(`${API_URL}/scoreboard`, {
          headers: getApiHeaders(),
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          const sortedData = [...data].sort((a, b) => b.highscore - a.highscore);
          setHighScores(sortedData);
          console.log('Highscores updated:', sortedData);
          if (currentUser && currentUser.id) {
            const userScore = sortedData.find(score => score.username === currentUser.username);
            if (userScore) {
              console.log(`User ${currentUser.username} has highscore: ${userScore.highscore}`);
            } else {
              console.log(`User ${currentUser.username} not found in highscores`);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    
    if (showHighScores) {
      fetchHighScores();
    } else {
      setHighScores([]);    }
  }, [showHighScores, updateTrigger, currentUser]);

  const toggleHighScores = () => {
    setShowHighScores(prev => !prev);
  };

  return (
    <div className="score-board">
      {showHighScores ? (
        <div className="highscores-display" onClick={toggleHighScores}>
          <h3>High Scores</h3>
          {highScores.length > 0 ? (
            <ol>
              {highScores.slice(0, 5).map((user, index) => (
                <li key={index}>
                  {user.username}: {user.highscore}
                  {currentUser && user.username === currentUser.username && " (You)"}
                </li>
              ))}
            </ol>
          ) : (
            <p>No high scores yet</p>
          )}
        </div>
      ) : (
        <GameHistory 
          history={history}
          currentUser={currentUser}
        />
      )}
      <GameScores 
        scores={scores} 
        currentUser={currentUser}
        onHighScoresClick={toggleHighScores}
      />
    </div>
  );
};

export default ScoreBoard;