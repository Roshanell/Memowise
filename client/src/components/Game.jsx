import Instructions from "./Instructions";
import MoreOptions from "./MoreOptions";
import NextCardButton from "./NextCardButton";
import NavBanner from "./NavBanner";
import { useEffect, useState } from "react";
import loadCards from "../apis/loadCards";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import CustomButton from "./CustomButton";

const Game = () => {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [currentCard, setCurrentCard] = useState({});
	const [cards, setCards] = useState([]);
	const [randomAnswers, setRandomAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [hint, setHint] = useState("");
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);

	const { user } = useAuth0();
	const personalizedInstructions = `Select the correct answer to each question`;

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
		loadCards(user).then(setCards);
	}, [user]);

	useEffect(() => setCurrentCard(cards[0] || {}), [cards]);

	const goToPreviousCard = () => {
		let previousCardIndex;
		if (currentCardIndex === 0) {
			previousCardIndex = cards.length - 1;
		} else {
			previousCardIndex = currentCardIndex - 1;
		}
		setCurrentCardIndex(previousCardIndex);
		setCurrentCard(cards[previousCardIndex]);
		setSelectedAnswer(null);
		setHint("");
	};

	const gotoNextCard = () => {
		setTimeout(() => {
			setIsFlipped(false);

			let nextCardIndex;
			if (currentCardIndex === cards.length - 1) {
				nextCardIndex = 0;
			} else {
				nextCardIndex = currentCardIndex + 1;
			}
			setCurrentCardIndex(nextCardIndex);
			setCurrentCard(cards[nextCardIndex]);
			setSelectedAnswer(null);
			setHint("");
		}, 2000);
	};

	const submitCorrectAnswer = async () => {
		try {
			const response = await fetch(
				`${API}/stats/correct/${user.sub}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ cardId: currentCard.id }),
				}
			);

			if (response.ok) {
				// console.log("Correct answer submitted");
			} else {
				console.error("Failed to submit correct answer");
			}
		} catch (error) {
			console.error("Error submitting correct answer:", error);
		}
	};

	const submitIncorrectAnswer = async () => {
		try {
			const response = await fetch(
				`${API}/stats/incorrect/${user.sub}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ cardId: currentCard.id }),
				}
			);

			if (response.ok) {
				// console.log("Incorrect answer submitted");
			} else {
				// console.error("Failed to submit incorrect answer");
			}
		} catch (error) {
			console.error("Error submitting incorrect answer:", error);
		}
	};

	const handleCorrectAnswerSelected = () => {
		setSelectedAnswer(0);
		setScore(score + 1);
		setIsFlipped(true);
		setCorrectAnswers(correctAnswers + 1);
		submitCorrectAnswer();
		gotoNextCard();
		setHint("");
		// console.log(score);
	};

	const handleIncorrectAnswerSelected = (hintText) => {
		setSelectedAnswer(null);
		// setScore(score - 1);
		submitIncorrectAnswer();
		setHint(hintText);
		// console.log(score);
		// console.log(hintText);
	};

	return (
		<div>
			<NavBanner />
			<Instructions personalizedInstructions={personalizedInstructions} />

			<div className={`score-component ${isFlipped ? "flipped" : ""}`}>
				<div className="score-circle">
					<div className="score-front">
						<span className="score-text">{score}</span>
					</div>
					<div className="score-back">
						<span className="score-text-flipped">
							{" "}
							<img
								src="https://i.imgur.com/i8qWOkU.png"
								className="score-star"
								alt="Star"
							/>
						</span>
					</div>
				</div>
			</div>

			{currentCard ? (
				<div id="game-section">
					<MoreOptions />

					<i className="fa fa-volume-up"></i>
					{currentCard.imagelink ? (
						<h3 className="card-concept-none">{currentCard.concept}</h3>
					) : (
						<h3 className="card-concept">{currentCard.concept}</h3>
					)}

					{currentCard.imagelink ? (
						<img src={currentCard.imagelink} height="200px" />
					) : null}

					<div className="change-cards">
						<NextCardButton icon={<FaCaretLeft />} onClick={gotoNextCard} />
						<NextCardButton
							icon={<FaCaretRight />}
							onClick={goToPreviousCard}
						/>
					</div>
					<div className="choices-container">
						{randomAnswers.map((answer, index) => {
							if (answer === 0) {
								return (
									<CustomButton 
										key={index}
										className={`multiple-choice-button ${
											selectedAnswer === 0 ? "selected" : ""
										}`}
										clickHandler={handleCorrectAnswerSelected}
									>
										{selectedAnswer === 0 && answer === 0 ? (
											<span className="smiley">&#128512;</span>
										) : null}
										{currentCard.answer}
									</CustomButton>
								);
							}
							if (answer === 1) {
								return (
									<CustomButton
										key={index}
										className="multiple-choice-button"
										clickHandler={() =>
											handleIncorrectAnswerSelected(currentCard.hintOne)
										}
									>
										{currentCard.wronganswerone}
									</CustomButton>
								);
							}
							if (answer === 2) {
								return (
									<CustomButton
										key={index}
										className="multiple-choice-button"
										clickHandler={() =>
											handleIncorrectAnswerSelected(currentCard.hintTwo)
										}
									>
										{currentCard.wronganswertwo}
									</CustomButton>
								);
							}
							return null;
						})}
					</div>

					{hint ? <div>{hint}</div> : null}
				</div>
			) : null}
		</div>
	);
};

export default Game;
