import React from "react";

function Home() {
	return (
		<div className="home-container">
			<div className="home-page left-box">
				{" "}
				<h1 className="heading-homepage">The only you need</h1>
			</div>
			<div className="left-box-inner">
				<h3 className="memory-aid-slogan">effective memory-aid tools</h3>
			</div>
			<div className="home-page right-box">
				<h1 className="heading-two">Flashcard</h1>
			</div>
			<div className="home-page left-box-two">
				<div className="game-ideas">
					<img className="number-icon" src="https://i.imgur.com/ktHLGO2.png" />
					<h3 className="number-word">NUMBER</h3>
				</div>
			</div>
			<div className="right-inner-box-one"></div>
			<div className="right-inner-box-two">
				<h3 className="learn-more-slogan">Learn new materials quickly</h3>
			</div>
			<div className="home-page right-box-two">
				<div className="game-ideas">
					<img className="number-icon" src="https://i.imgur.com/S8XNewu.png" />
					<h3 className="number-word">shapes</h3>
				</div>
			</div>
			<div className="home-page left-box-three">
				{" "}
				<div className="game-ideas">
					<h3 className="colors-word">colors</h3>
					<img className="number-icon" src="https://i.imgur.com/FdGCYI0.png" />
				</div>
			</div>
			<div className="home-page right-box-three">
				{" "}
				<div className="game-ideas">
					<h3 className="colors-word">Lowercase</h3>
					<img className="number-icon" src="https://i.imgur.com/iHhRLDb.png" />
				</div>
			</div>
		</div>
	);
}

export default Home;
