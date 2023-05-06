import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateCardForm() {
	const [card, setCard] = useState({
		concept: "",
		answer: "",
		imagelink: "",
		audiolink: "",
		wronganswerone: "",
		wronganswertwo: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCard((prevCard) => ({ ...prevCard, [name]: value }));
	};

	const postCard = () => {
		//console.log(student, "post method")
		return fetch(`http://localhost:8080/api/cards`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(card),
		})
			.then((response) => {
				//console.log(response);
				if (response.ok) {
					console.log("ok");
					return response.json();
					//loadStudents();
				}
			})
			.then((imagesData) => {
				console.log("front the front end", imagesData);
			});
	};

	const clearForm = () => {
		setCard({
			concept: "",
			answer: "",
			imagelink: "",
			audiolink: "",
			wronganswerone: "",
			wronganswertwo: "",
		});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(card);
		postCard();
		clearForm();
		// Call the API or do any other necessary action here
	};

	return (
		<Form onSubmit={handleSubmit} className="create-card-form">
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
					name="answer"
					value={card.answer}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId="formImageLink">
				<Form.Label>Image Link</Form.Label>
				<Form.Control
					type="text"
					name="imagelink"
					value={card.imagelink}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formAudioLink">
				<Form.Label>Audio Link</Form.Label>
				<Form.Control
					type="text"
					name="audiolink"
					value={card.audiolink}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formWrongAnswerOne">
				<Form.Label>Wrong Answer 1 (optional)</Form.Label>
				<Form.Control
					type="text"
					name="wronganswerone"
					value={card.wronganswerone}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formWrongAnswerTwo">
				<Form.Label>Wrong Answer 2 (optional)</Form.Label>
				<Form.Control
					type="text"
					name="wronganswertwo"
					value={card.wronganswertwo}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Save Card
			</Button>
		</Form>
	);
}
