import React from "react";
import TitleBar from "./TitleBar";

const Header = ({ currentUser }) => {
  return (
    <header>
      <TitleBar title="Paper Rock Scissors Game" />
      {currentUser && (
        <div className="user-info">
          <p>Welcome, {currentUser.username}!</p>
        </div>
      )}
    </header>
  );
};

export default Header;