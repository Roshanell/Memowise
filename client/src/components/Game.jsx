import Instructions from "./Instructions";
import Button from "./Button";
import MoreOptions from "./MoreOptions";
import NextCardButton from "./NextCardButton";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import loadCards from "../apis/loadCards";

const Game = () => {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [currentCard, setCurrentCard] = useState({});
	const [cards, setCards] = useState([]);
	const [randomAnswers, setRandomAnswers] = useState([]);

	useEffect(() => {
		const newRandomAnswers = [];

		let answers = [0, 1, 2];
		while (answers.length > 0) {
			const answer = answers.splice(
				Math.floor(Math.random() * answers.length),
				1
			)[0];
			newRandomAnswers.push(answer);
		}
		setRandomAnswers(newRandomAnswers);
	}, [currentCard]);

	useEffect(() => {
		loadCards().then(setCards);
	}, []);

	useEffect(() => setCurrentCard(cards[0] || {}), [cards]);
	const goToPreviousCard = () => {
		let previousCardIndex;
		if (currentCardIndex === 0) {
			previousCardIndex = cards.length - 1;
		} else {
			previousCardIndex = currentCardIndex - 1;
		}
		setCurrentCardIndex(previousCardIndex);
		const previousCard = cards[previousCardIndex];

		setCurrentCard(previousCard);
	};
	return (
		<div>
			<Banner />
			<div id="game-section">
				<MoreOptions />
				<i class="fa fa-volume-up"></i>
				<div className="image-container">
					{/* NOTE : use webformat url when accessing image data from pixabay */}
					<img src={currentCard.imagelink} height="200px" />
				</div>
				<div>
					<NextCardButton onClick={goToPreviousCard} />
					<NextCardButton />
				</div>
				<div className="choices-container">
					{randomAnswers.map((answer) => {
						if (answer === 0)
							return (
								<Button className="multiple-choice-button">
									{currentCard.answer}
								</Button>
							);
						if (answer === 1)
							return (
								<Button className="multiple-choice-button">
									{currentCard.wronganswerone}
								</Button>
							);
						if (answer === 2)
							return (
								<Button className="multiple-choice-button">
									{currentCard.wronganswertwo}
								</Button>
							);
					})}
				</div>
				<Instructions />
			</div>
		</div>
	);
};

export default Game;
