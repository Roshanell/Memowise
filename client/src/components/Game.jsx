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
				<img
					src="https://pixabay.com/get/g47a88302bebf5a39824dfacce17796e7f9cd0b309576ccf81951fe019c15a505be3626d286a56c830f061521980ef0a7_640.png"
					height="200px"
				/>
			</div>
			<div>
				<NextCardButton  />
				<NextCardButton />
			</div>
			<div className="choices-container">
				<Button className="multiple-choice-button" />
				<Button className="multiple-choice-button" />
				<Button className="multiple-choice-button" />
			</div>
			
		</div>
	);
};

export default Game;
