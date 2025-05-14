import React from "react";
import "./GameScores.css"
import TitleBar from "./TitleBar";
import ScoreBox from "./ScoreBox";
import Button from "../../../tools/Button";

const GameScores = ({ scores, currentUser, onHighScoresClick }) => {
    const playerScore = scores?.zaidejas || 0;
    const pcScore = scores?.pc || 0;

    return(
        <div className="game-scores-wrapper">
            <TitleBar />
            <div className="player-label">
                {currentUser ? currentUser.username : "Player"}<span className="score-divider">PC</span>
            </div>
            <div className="scores">
                <ScoreBox title="" score={playerScore} />
                <ScoreBox title="" score={pcScore} />
            </div>
            <Button 
              className="highscores-button"
              onClick={onHighScoresClick}
            >
              HighScores
            </Button>
        </div>
    )
}

export default GameScores;