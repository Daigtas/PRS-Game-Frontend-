import React, { Children } from "react";
import Footer from './Footer/Footer'
import Header from './Header/Header'
import PlayBoard from './PlayBoard/PlayBoard'
import ScoreBoard from './ScoreBoard/ScoreBoard'
const Main = () => {
return (
    <div className="container">
        <Header />
        <ScoreBoard />
        <PlayBoard />
        <Footer />
    </div>
)
};
export default Main;