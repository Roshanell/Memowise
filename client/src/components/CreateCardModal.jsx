import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function CreateCardModal() {
	const [open, setOpen] = useState(false);
	{
		/* Question, Answer, Image Link, Audio Link Wrong Answer, Wrong Answer,  */
	}
	const [card, setCard] = useState({
		concept: "",
		correctAnswer: "",
		imageLink: "",
		audioLink: "",
		wrongAnswerOne: "",
		wrongAnswerTwo: "",
	});

	const handleClickOpen = (event) => {
		setOpen(true);
	};

	const handleClose = (event) => {
		setOpen(false);
	};

	const handleCardConceptChange = (event) => {
		//	event.preventDefault();
		const newCardConcept = event.target.value;
		setCard((card) => ({
			...card,
			concept: newCardConcept,
		}));
		console.log(newCardConcept);
	};

	const handleCorrectAnswerChange = (event) => {
		//event.preventDefault();
		const newCorrectAnswer = event.target.value;
		setCard((card) => ({ ...card, correctAnswer: newCorrectAnswer }));
	};

	const handleImageLinkChange = (event) => {
		//event.preventDefault();
		const newImageLink = event.target.value;
		setCard((card) => ({ ...card, imageLink: newImageLink }));
	};
	const handleAudioLinkChange = (event) => {
		//event.preventDefault();
		const newAudioLink = event.target.value;
		setCard((card) => ({ ...card, audioLink: newAudioLink }));
	};

	const handleWrongAnswerOneChange = (event) => {
		//event.preventDefault();
		const newWrongAnswerOne = event.target.value;
		setCard((card) => ({ ...card, wrongAnswerOne: newWrongAnswerOne }));
	};
	const handleWrongAnswerTwoChange = (event) => {
		//event.preventDefault();
		const newWrongAnswerTwo = event.target.value;
		setCard((card) => ({
			...card,
			wrongAnswerTwo: newWrongAnswerTwo,
		}));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setCard(card);
		console.log(card);
		handleClose(event);
	};
	return (
		<form onSubmit={handleSubmit}>
			<Button variant="outlined" onClick={handleClickOpen}>
				Create A Card
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create a Card</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To create a new card, please enter your the information below.
					</DialogContentText>
					{/* concept: "", correctAnswer: "", imageLink: "", audioLink:"",
					WrongAnswerOne:"", WrongAnswerTwo: "", }) */}
					<TextField
						autoFocus
						margin="dense"
						id="card-concept"
						label="Card Concept"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={card.concept}
						onChange={handleCardConceptChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="answer"
						label="Answer"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={card.correctAnswer}
						onChange={handleCorrectAnswerChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="image-link"
						label=" Image Link"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={card.imageLink}
						onChange={handleImageLinkChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="audio-link"
						label=" Audio Link"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={card.audioLink}
						onChange={handleAudioLinkChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="wrong-answer-one"
						label=" Wrong Answer 1 (optional users can chose to just review instead of quiz)"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={card.WrongAnswerOne}
						onChange={handleWrongAnswerOneChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="wrong-answer-two"
						label=" Wrong Answer 2 (optional)"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={card.WrongAnswerTwo}
						onChange={handleWrongAnswerTwoChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Create Card</Button>
				</DialogActions>
			</Dialog>
		</form>
	);
}
