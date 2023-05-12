import React from "react";
import { useState } from "react";

function Card({ card, audio, toDelete }) {
	const [isFlipped, setIsFlipped] = useState(false);
	// how to access audio file name as a string
	//console.log(audio.data[0].hwi.prs[0].sound.audio)

	// console.log(audioString);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	const onDelete = (toDeleteStudent) => {
		console.log(card.id, toDeleteStudent, toDelete);
		toDelete(toDeleteStudent);
	};

	return (
		<div>
			<div
				className={`create-card ${isFlipped ? "flipped" : ""}`}
				onClick={handleClick}
			>
				<div className="front">
					<h2>{card.concept}</h2>
					{card.imagelink ? (
						<img src={card.imagelink} className="create-card-image" />
					) : null}
					<button
						type="button"
						onClick={() => {
							onDelete(card);
						}}
					>
						Delete
					</button>
				</div>
				<div className="back">
					{card.audioLink ? (
						<>
							<i class="fa fa-volume-up"></i>
							<audio className="audio-player" scr={""} controls />
						</>
					) : null}
					<p>{card.answer}</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
