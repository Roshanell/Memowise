import React from "react";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

function Flashcard({ card, audio, toDelete }) {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div>
			{/* <div
				className={`create-card ${isFlipped ? "flipped" : ""}`}
				onClick={handleClick}
			>
				<div className="front">
					<Badge bg="danger">
						{card.tag ? (
							<div>{card.tag}</div>
						) : null}
					</Badge>

					<p>{card.concept}</p>
					{card.imagelink ? (
						<img src={card.imagelink} className="create-card-image" />
					) : null}
					<button
						type="button"
						onClick={() => {
							toDelete(card);
						}}
					>
						Delete
					</button>
				</div>
				<div className="back">
					<p>{card.answer}</p>
					{card.audiolink ? (
						<>
							<audio className="audio-player" src={card.audiolink} controls />
						</>
					) : null}
				</div>
			</div> */}

			<Card style={{ width: "18rem" }}>
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						Card Subtitle
					</Card.Subtitle>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					<Card.Link href="#">Card Link</Card.Link>
					<Card.Link href="#">Another Link</Card.Link>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Flashcard;
