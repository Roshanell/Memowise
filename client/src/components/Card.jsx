import React from "react";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";


function Card({ card, audio, toDelete }) {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};


	return (
		<div>
			<div
				className={`create-card ${isFlipped ? "flipped" : ""}`}
				onClick={handleClick}
			>
				<div className="front">
					<Badge bg="danger">
						{card.tag ? (
							// <div className="item-category">
							// 	<a href="#">{card.tag}</a>
							// </div>
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
					{card.audiolink ? (
						<>
							<i className="fa fa-volume-up"></i>
							<audio className="audio-player" src={card.audiolink} controls />
						</>
					) : null}
					<p>{card.answer}</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
