import React from "react";

const TitleBar = ({ title = "Paper Rock Scissors Game" }) => {
  return (
    <h1 className="game-title">{title}</h1>
  );
};

export default TitleBar;