import React from "react";

const ScoreBox = ({title, score}) => {
return (
    <div className="score-box">
      <h3>{title}</h3>
      <p>{score}</p>
    </div>
)
};
export default ScoreBox;