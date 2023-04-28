import Button from "./Button";
import NextCardButton from "./NextCardButton";
const Game = () => {
	return (
		<div id="game-section">
			<i class="fa fa-volume-up"></i>
			<div className="image-container">
				<img
					src="https://pixabay.com/get/g0525b7442c45d2a930cae7f1ac719087d22aba7400ac293438569cf0f036b92079aa149bf6413d33154ffabc8752d8e3fbc2dbb6294d1e31ccf73bd97d3a81a4_1280.jpg"
					height="200px"
				/>
			</div>
			<div className="choices-container">
				<Button className="multiple-choice-button" />
				<Button className="multiple-choice-button" />
				<Button className="multiple-choice-button" />
			</div>
			<NextCardButton />
			<NextCardButton />
		</div>
	);
};

export default Game;
