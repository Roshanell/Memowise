import React from "react";
import { useState } from "react";

function Card({ card, audio, toDelete }) {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	// const onDelete = (toDeleteStudent) => {
	// 	console.log(card.id, toDeleteStudent, toDelete);
	// 	toDelete(toDeleteStudent);
	// };
	

	return (
		<div>
			<div
				className={`create-card ${isFlipped ? "flipped" : ""}`}
				onClick={handleClick}
			>
				<div className="front">
					{card.tag ? (
						<div class="item-category">
							<a href="#">{card.tag}</a>
						</div>
					) : null}

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
							<i class="fa fa-volume-up"></i>
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
