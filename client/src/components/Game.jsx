import Instructions from "./Instructions";
import Button from "./Button";
import MoreOptions from "./MoreOptions";
import NextCardButton from "./NextCardButton";

const Game = () => {
	return (
		<div id="game-section">
			<MoreOptions />
			<i class="fa fa-volume-up"></i>
			<div className="image-container">
				{/* NOTE : use webformat url when accessing image data from pixabay */}
				<img src="https://i.imgur.com/oEhsu1g.png" height="200px" />
			</div>
			<div>
				<NextCardButton />
				<NextCardButton />
			</div>
			<div className="choices-container">
				<Button className="multiple-choice-button" />
				<Button className="multiple-choice-button" />
				<Button className="multiple-choice-button" />
			</div>
			<Instructions />
		</div>
	);
};

export default Game;
