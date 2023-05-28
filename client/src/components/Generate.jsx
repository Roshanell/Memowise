import React, { useState } from "react";

import { Loading } from "./Loading";
import Form from "react-bootstrap/Form";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useAuth0 } from "@auth0/auth0-react";
import Instructions from "./Instructions";
import Flashcard from "./Flashcard";

function Generate() {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;
	const [generatedCards, setGeneratedCards] = useState([]);
	const [cardTopic, setCardTopic] = useState("");
	const [numberOfCards, setNumberOfCards] = useState(0);
	const [gradeLevel, setGradeLevel] = useState(0);
	const [loading, setLoading] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [cardsSaved, setCardsSaved] = useState(false);
	const { user } = useAuth0();
	const personalizedMessage = `Enter Topic: Input the desired topic for the flashcards.
Enter Grade Level: Provide the grade level for the flashcards. If not in school, assume 12th grade.
Enter Number of Cards: Specify the desired number of flashcards to generate.
Click "Generate Flashcards" or a similar button to create the flashcards using AI.`;

	const clearForm = () => {
		setCardTopic("");
		setNumberOfCards(0);
		setGradeLevel(0);
	};
	const handlegradeLevel = (event) => {
		const gradeLevel = event.target.value;
		// console.log(gradeLevel);
		setGradeLevel(gradeLevel);
	};
	const handleNumberOfCardsChange = (event) => {
		const numberOfCards = event.target.value;
		// console.log(numberOfCards);
		setNumberOfCards(numberOfCards);
	};
	const handleCardTopicChange = (event) => {
		const cardTopic = event.target.value;
		// console.log(cardTopic);
		setCardTopic(cardTopic);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const cards = await generateCards();
		// console.log(cards);
		setGeneratedCards(cards);
		clearForm();
	};
	const handleSetSubmit = () => {
		// console.log("submitted");
		setSubmit(true);
		setLoading(true);
	};
	const saveGeneratedCards = async () => {
		// console.log("saving");
		return await fetch(`${API}/cards/${user.sub}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(generatedCards),
		})
			.then((response) => {
				//console.log(response);
				if (response.ok) {
					setGeneratedCards([]);
					setCardsSaved(true);
					// console.log("ok");
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
		const response = await fetch(`${API}/cards-generate`, requestOptions);
		if (response.ok) {
			// console.log("from openai", response);
			setLoading(false);
			const responseText = await response.text();
			// console.log(responseText);
			return JSON.parse(responseText);
		}
	};
	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Please note that response time may vary and accuracy is up to date as of
			2021.
		</Tooltip>
	);

	return (
		<div className="generate-tab">
			<Instructions personalizedInstructions={personalizedMessage} />
			<form onSubmit={handleSubmit} className="create-card-form">
				<Form.Label className="create-card-inputs">Enter a topic </Form.Label>
				<input
					type="text"
					name="generate card"
					value={cardTopic}
					onChange={handleCardTopicChange}
					placeholder="Enter topic"
					required
				/>
				<Form.Label className="create-card-inputs">
					Enter the number of cards you want
				</Form.Label>
				<input
					type="number of cards"
					name="numberofcards "
					value={numberOfCards}
					onChange={handleNumberOfCardsChange}
					placeholder="Enter number"
					required
				/>
				<Form.Label className="create-card-inputs">
					Enter the grade level of the class
				</Form.Label>
				<input
					type="number"
					name="grade level"
					value={gradeLevel}
					onChange={handlegradeLevel}
					placeholder="Enter grade"
					required
				/>
				<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={renderTooltip}
				>
					<button
						onClick={handleSetSubmit}
						type="submit"
						className="submit-button"
					>
						Submit
					</button>
				</OverlayTrigger>
			</form>

			{loading && setSubmit ? (
				<Loading />
			) : (
				<ul className="card-ul">
					{generatedCards.map((card) => {
						return (
							<li className="card-list" key={card.id}>
								<Flashcard card={card} key={card.id} />
							</li>
						);
					})}
				</ul>
			)}
			{generatedCards.length > 0 ? (
				<button className="submit-button" onClick={saveGeneratedCards}>
					Save
				</button>
			) : null}
			{cardsSaved ? <div>Cards saved successfully </div> : null}
		</div>
	);
}

export default Generate;
