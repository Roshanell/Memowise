import Instructions from "./Instructions";
import Button from "./Button";
import MoreOptions from "./MoreOptions";
import NextCardButton from "./NextCardButton";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import loadCards from "../apis/loadCards";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

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

	useEffect(() => setCurrentCard(cards[0] || {}), [cards]);
	const gotoNextCard = () => {
		let nextCardIndex;
		if (currentCardIndex === cards.length - 1) {
			nextCardIndex = 0;
		} else {
			nextCardIndex = currentCardIndex + 1;
		}
		setCurrentCardIndex(nextCardIndex);
		const nextCard = cards[nextCardIndex];

		setCurrentCard(nextCard);
	};
	return (
		<div>
			<Banner />

			{currentCard ? (
				<div id="game-section">
					<MoreOptions />

					<i class="fa fa-volume-up"></i>
					<h3>{currentCard.cardcontent}</h3>
					<div className="image-container">
						{/* NOTE : use webformat url when accessing image data from pixabay */}
						<img src={currentCard.imagelink} height="200px" />
					</div>
					<div>
						<NextCardButton icon={<FaCaretLeft />} onClick={gotoNextCard} />
						<NextCardButton
							icon={<FaCaretRight />}
							onClick={goToPreviousCard}
						/>
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
			) : null}
		</div>
	);
};

export default Game;
