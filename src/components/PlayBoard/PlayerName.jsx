import React from "react";

const PlayerName = ({ currentUser }) => {
  return (
    <h3>{currentUser ? currentUser.username : "Player"}</h3>
  );
};

export default PlayerName;