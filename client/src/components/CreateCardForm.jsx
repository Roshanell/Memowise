import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateCardForm() {
	const [card, setCard] = useState({
		concept: "",
		correctAnswer: "",
		imageLink: "",
		audioLink: "",
		wrongAnswerOne: "",
		wrongAnswerTwo: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCard((prevCard) => ({ ...prevCard, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(card);
		// Call the API or do any other necessary action here
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formConcept">
				<Form.Label>Card Concept</Form.Label>
				<Form.Control
					type="text"
					name="concept"
					value={card.concept}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId="formAnswer">
				<Form.Label>Answer</Form.Label>
				<Form.Control
					type="text"
					name="correctAnswer"
					value={card.correctAnswer}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId="formImageLink">
				<Form.Label>Image Link</Form.Label>
				<Form.Control
					type="text"
					name="imageLink"
					value={card.imageLink}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formAudioLink">
				<Form.Label>Audio Link</Form.Label>
				<Form.Control
					type="text"
					name="audioLink"
					value={card.audioLink}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formWrongAnswerOne">
				<Form.Label>Wrong Answer 1 (optional)</Form.Label>
				<Form.Control
					type="text"
					name="wrongAnswerOne"
					value={card.wrongAnswerOne}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formWrongAnswerTwo">
				<Form.Label>Wrong Answer 2 (optional)</Form.Label>
				<Form.Control
					type="text"
					name="wrongAnswerTwo"
					value={card.wrongAnswerTwo}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Save Card
			</Button>
		</Form>
	);
}
