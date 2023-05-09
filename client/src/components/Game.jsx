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
					<Button className="multiple-choice-button">
						{currentCard.answer}
					</Button>
					<Button className="multiple-choice-button">
						{currentCard.wronganswerone}
					</Button>
					<Button className="multiple-choice-button">
						{currentCard.wronganswertwo}
					</Button>
				</div>
				<Instructions />
			</div>
		</div>
	);
};

export default Game;
