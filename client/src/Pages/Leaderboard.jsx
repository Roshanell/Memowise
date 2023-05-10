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
			</div>
			<div className="leaderboard-headings-group">
				<h1 className="leaderboard-heading">Position</h1>
				<h1 className="leaderboard-heading">Name</h1>
				<h1 className="leaderboard-heading">Points</h1>
			</div>
			<div className="player-info">
				<Player />
				<Player />
				<Player />
			</div>
		</div>
	);
};

export default Leaderboard;
