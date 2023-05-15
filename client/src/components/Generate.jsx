import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { Loading } from "./Loading";

function Generate() {
	const [generatedCards, setGeneratedCards] = useState([]);
	const [cardTopic, setCardTopic] = useState("");
	const [numberOfCards, setNumberOfCards] = useState(0);
	const [gradeLevel, setGradeLevel] = useState(0);
	const [loading, setLoading] = useState(false);
	const [submit, setSubmit] = useState(false);
	const handlegradeLevel = (event) => {
		const gradeLevel = event.target.value;
		console.log(gradeLevel);
		setGradeLevel(gradeLevel);
	};
	const handleNumberOfCardsChange = (event) => {
		const numberOfCards = event.target.value;
		console.log(numberOfCards);
		setNumberOfCards(numberOfCards);
	};
	const handleCardTopicChange = (event) => {
		const cardTopic = event.target.value;
		console.log(cardTopic);
		setCardTopic(cardTopic);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const cards = await generateCards();
		setGeneratedCards(cards);
		// clearForm();
	};

	const handleSetSubmit = () => {
		console.log("submitted");
		setSubmit(true);
		setLoading(true);
	};
	const saveGeneratedCards = async () => {
		console.log("saving");
		return await fetch(`http://localhost:8080/api/cards`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(generatedCards),
		})
			.then((response) => {
				//console.log(response);
				if (response.ok) {
					console.log("ok");
					return response.json();
				}
			})
			.then((imagesData) => {
				console.log("front the front end", imagesData);
			});
	};

	const generateCards = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numberOfCards,
				cardTopic,
				gradeLevel,
			}),
		};
		const response = await fetch(
			`http://localhost:8080/api/cards-generate`,
			requestOptions
		);
		if (response.ok) {
			console.log("from openai", response);
			setLoading(false);
			return JSON.parse(await response.text());
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="create-card-form">
				<input
					type="text"
					name="generate card"
					value={cardTopic}
					onChange={handleCardTopicChange}
					placeholder="Enter topic"
					required
				/>
				<input
					type="number of cards"
					name="numberofcards "
					value={numberOfCards}
					onChange={handleNumberOfCardsChange}
					placeholder="Enter number"
					required
				/>
				<input
					type="number"
					name="grade level"
					value={gradeLevel}
					onChange={handlegradeLevel}
					placeholder="Enter grade"
					required
				/>
				<button onClick={handleSetSubmit} type="submit">
					Submit
				</button>
			</form>

			{/* <div>{JSON.stringify(generatedCards)}</div> */}
			{loading && setSubmit ? (
				<Loading />
			) : (
				<ul className="card-ul">
					{generatedCards.map((card) => {
						return (
							<li className="card-list" key={card.id}>
								<Card card={card} />
							</li>
						);
					})}
				</ul>
			)}
			{generatedCards.length > 0 ? (
				<button onClick={saveGeneratedCards}>Save</button>
			) : null}
		</div>
	);
}

export default Generate;
