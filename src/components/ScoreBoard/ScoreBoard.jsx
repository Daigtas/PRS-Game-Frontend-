import React, { useState, useEffect } from "react";
import GameHistory from "./GameHistory/GameHistory";
import GameScores from "./GameScores/GameScores";
import "./ScoreBoard.css";

// API base URL - change this to match your Flask server
const API_URL = 'http://localhost:5000';

const ScoreBoard = ({ scores, history, currentUser, updateTrigger }) => {
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);

  // Fetch high scores from the API when component mounts or when showHighScores changes
  // or when the updateTrigger changes (game completed)
  useEffect(() => {
    // Define fetch function outside the condition to ensure consistent behavior
    const fetchHighScores = async () => {
      try {
        const response = await fetch(`${API_URL}/scoreboard`);
        if (response.ok) {
          const data = await response.json();
          // Sort high scores in descending order
          const sortedData = [...data].sort((a, b) => b.highscore - a.highscore);
          setHighScores(sortedData);
          console.log('Highscores updated:', sortedData);
        }
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    
    if (showHighScores) {
      fetchHighScores();
    } else {
      // Initialize with empty array when not showing high scores
      // This ensures consistent state management
      setHighScores([]);
    }
  }, [showHighScores, updateTrigger]); // Add updateTrigger to dependencies

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