import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function CreateCardModal() {
	const [isShowing, setIsShowing] = useState(false);
	const [card, setCard] = useState({
		concept: "",
		answer: "",
		imagelink: "",
		audiolink: "",
		wronganswerone: "",
		wronganswertwo: "",
	});

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
	const [value, setValue] = useState("");
	const handleChange = (event) => setValue(event.target.value);

	const handleInputChange = (event) => {
		// extracts the name and value props from the input elem that is triggered to change.
		const { name, value } = event.target;
		// uses set card function to update the state of the card obj
		// takes func and update the properties that have changed
		// new state val uses spread operator to get previous data ,
		//then stores the value of the prop that matches the name extracted  to the new value
		setCard((prevCard) => ({ ...prevCard, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(card);
		setIsShowing((prevVal) => !prevVal);

		console.log("modal submitted");
	};
	const handleShowModal = (event) => {
		// console.log("clicked");
		setIsShowing(true);
	};

	return (
		<>
			<Button variant="outline-primary" onClick={handleShowModal}>
				Create a Card
			</Button>
			<Modal centered show={isShowing}>
				<Modal.Header closeButton>
					<Modal.Title>Create a Card</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Please enter your Employee ID</p>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="emploeeId">
							<Form.Label>Employee ID:</Form.Label>
							<Form.Control
								type="text"
								required
								value={value}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId="formConcept">
							<Form.Label>Card Concept</Form.Label>
							<Form.Control
								type="text"
								name="concept"
								value={card.concept}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formAnswer">
							<Form.Label>Answer</Form.Label>
							<Form.Control
								type="text"
								name="correctAnswer"
								value={card.answer}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formImageLink">
							<Form.Label>Image Link</Form.Label>
							<Form.Control
								type="text"
								name="imageLink"
								value={card.imagelink}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formAudioLink">
							<Form.Label>Audio Link</Form.Label>
							<Form.Control
								type="text"
								name="audioLink"
								value={card.audiolink}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formWrongAnswerOne">
							<Form.Label>Wrong Answer 1 (optional)</Form.Label>
							<Form.Control
								type="text"
								name="wrongAnswerOne"
								value={card.wronganswerone}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formWrongAnswerTwo">
							<Form.Label>Wrong Answer 2 (optional)</Form.Label>
							<Form.Control
								type="text"
								name="wrongAnswerTwo"
								value={card.wronganswertwo}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Modal.Footer>
								<Button type="submit">Continue</Button>
							</Modal.Footer>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
