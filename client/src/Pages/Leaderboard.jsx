import React from "react";
import Form from "react-bootstrap/Form";
import Instructions from "../components/Instructions";
import Player from "../components/Player";

const Leaderboard = () => {
	return (
		<div>
			<div className="game-select">
				<Form.Select
					aria-label="Game selection"
					className="select-game-leaderboard"
				>
					<option>Open this select menu</option>
					<option value="1">One</option>
					<option value="2">Two</option>
					<option value="3">Three</option>
				</Form.Select>
				<Instructions />
				<img src="https://i.imgur.com/OaZRpoH.png" height={"79"} width={"58"} />
			</div>
			<div className="leaderboard-headings">
				<h1>Position</h1>
				<h1>Name</h1>
				<h1>Points</h1>
			</div>
            <div>
			<Player />
            </div>
           
		</div>
	);
};

export default Leaderboard;
