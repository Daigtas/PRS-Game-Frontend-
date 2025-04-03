import React from "react";
import Footer from './Footer/Footer'
import Header from './Header/Header'
import PlayBoard from './PlayBoard/PlayBoard'
import ScoreBoard from './ScoreBoard/ScoreBoard'

const Main = () => { gameState, userState, updatePlayerChoice, playGame, resetGame, setUserState
return (
    <div className="container">
        <Header />
        <ScoreBoard />
        <PlayBoard 
          playerChoice={gameState.playerChoice}
          computerChoice={gameState.computerChoice}
          result={gameState.result}
          updatePlayerChoice={updatePlayerChoice}
          playGame={playGame}
        />
        <Footer />
    </div>
)
};
export default Main;