import React from "react";
import "./GameScores.css"
import TitleBar from "./TitleBar";
import ScoreBox from "./ScoreBox";
import Button from "../../../tools/Button";

const GameScores = () => {
    return(
        <div className="game-scores-wrapper">
            <TitleBar/>
            <div className="scores">
                <ScoreBox title = "Player"/>
                <ScoreBox title = "PC"/>
            </div>
            <Button>HighScores</Button>
            
        </div>
    )
}

export default GameScores;