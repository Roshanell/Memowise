import React from "react";
import Profile from "../components/Profile"

function Home() {
	return (
		<div className="home-container">
			<div className="left-box">
				<h1 className="heading-homepage">
					The only flashcard
					<br /> you need
				</h1>
			</div>
			<div className="card2">
				<div className="card2-1 right-inner-box-one">
					<img src="https://imgur.com/nzuD8BK" />
				</div>
			</div>
			<div className="left-box-inner">
				<h3 className="memory-aid-slogan">Effective Memory Aid</h3>
			</div>
			<div className="right-inner-box-two">
				<h3 className="learn-more-slogan">Learn new materials quickly</h3>
			</div>
			<div className="game-ideas">
				<img className="number-icon" src="https://i.imgur.com/ktHLGO2.png" />
				<h3 className="home-word">NUMBER</h3>
			</div>
			<div className="game-ideas shapes">
				<img src="https://i.imgur.com/S8XNewu.png" />
				<h3 className="home-word">shapes</h3>
			</div>
			<div className="game-ideas">
				<h3 className="home-word">colors</h3>
				<img src="https://i.imgur.com/FdGCYI0.png" />
			</div>
			<div className="game-ideas shapes">
				<h3 className="home-word">Lowercase</h3>
				<img src="https://i.imgur.com/iHhRLDb.png" />
			</div>
		</div>
	);
}

export default Home;
