import React from "react";
import { useState } from "react";

function Card({ card, audio }) {
	const [isFlipped, setIsFlipped] = useState(false);
	// how to access audio file name as a string
	//console.log(audio.data[0].hwi.prs[0].sound.audio)

	// console.log(audioString);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div
			className={`create-card ${isFlipped ? "flipped" : ""}`}
			onClick={handleClick}
		>
			<div className="front">
				<h2>{card.answer}</h2>
				<img src={card.imagelink} className="create-card-image" />
			</div>
			<div className="back">
				<i class="fa fa-volume-up"></i>
				<audio className="audio-player" scr={""} controls />

				<p>People, animals, creatures, or objects in the story.</p>
			</div>
		</div>
	);
}

export default Card;
