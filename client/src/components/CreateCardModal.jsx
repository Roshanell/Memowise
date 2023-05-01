import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function CreateCardModal() {
	const [show, setShow] = useState(false);
	const [card, setCard] = useState({
		concept: "",
		correctAnswer: "",
		imageLink: "",
		audioLink: "",
		wrongAnswerOne: "",
		wrongAnswerTwo: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCard((prevCard) => ({ ...prevCard, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(card);
		handleClose();
		console.log("modal submitted");
	};

	return (
		<>
			<Button variant="outline-primary" onClick={handleShow}>
				Create a Card
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create a Card</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
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
								value={card.correctAnswer}
								onChange={handleInputChange}
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
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							Create Card
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}
