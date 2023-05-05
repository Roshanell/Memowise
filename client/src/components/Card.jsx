import React from "react";
import { useState } from "react";

function Card() {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div className={`create-card ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
			<div className="front">
				<h2>Characters</h2>
				<img src="https://i.imgur.com/byjwQxI.png" height={"100px"} />
			</div>
			<div className="back">
				<i class="fa fa-volume-up"></i>
				<p>People, animals, creatures, or objects in the story.</p>
			</div>
		</div>
	);
}

export default Card;
