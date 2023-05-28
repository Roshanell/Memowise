import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateCardForm() {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;
	const [card, setCard] = useState({
		concept: "",
		answer: "",
		imagelink: "",
		audiolink: "",
		wronganswerone: "",
		wronganswertwo: "",
		tag: "",
	});
	const { user } = useAuth0();

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCard((prevCard) => ({ ...prevCard, [name]: value }));
	};

	const postCard = () => {
		//console.log(student, "post method")
		return fetch(`${API}/cards/${user.sub}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([card]),
		})
			.then((response) => {
				//console.log(response);
				if (response.ok) {
					// console.log("ok");
					return response.json();
				}
			})
			.then((imagesData) => {
				// console.log("front the front end", imagesData);
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
			tag: "",
		});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(card);
		postCard();
		clearForm();
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="create-card-form create-card-inputs"
		>
			<Form.Group controlId="formConcept" className="create-card-inputs">
				<Form.Label>Card Concept</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="concept"
					value={card.concept}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId="formAnswer " className="create-card-inputs">
				<Form.Label>Answer</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="answer"
					value={card.answer}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId="formImageLink" className="create-card-inputs">
				<Form.Label>Image Link</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="imagelink"
					value={card.imagelink}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formAudioLink" className="create-card-inputs">
				<Form.Label>Audio Link</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="audiolink"
					value={card.audiolink}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formWrongAnswerOne" className="create-card-inputs">
				<Form.Label>Wrong Answer 1 (optional)</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="wronganswerone"
					value={card.wronganswerone}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="formWrongAnswerTwo" className="create-card-inputs">
				<Form.Label>Wrong Answer 2 (optional)</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="wronganswertwo"
					value={card.wronganswertwo}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group controlId="tag" className="create-card-inputs">
				<Form.Label>One Word Tag</Form.Label>
				<br />
				<Form.Control
					type="text"
					name="tag"
					value={card.tag}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<button className="submit-button" type="submit">
				Save Card
			</button>
		</Form>
	);
}
