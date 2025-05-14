import React from "react";

const PlayerName = ({ currentUser }) => {
  return (
    <h3 className={currentUser ? "player-logged-in" : ""}>
      {currentUser ? currentUser.username : "Player"}
    </h3>
  );
};

export default PlayerName;