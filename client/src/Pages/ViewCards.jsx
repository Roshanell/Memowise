import React from "react";
import Card from "../components/Card";
import { useState, useEffect } from "react";

function ViewCards() {
	const [cards, setCards] = useState([]);
	const [audio, setAudio] = useState([]);

	const loadCards = () => {
		fetch("http://localhost:8080/api/cards")
			.then((response) => response.json())
			.then((cards) => {
				setCards(cards);
				console.log(cards, "list of cards");
			})
			.catch((error) => console.error(error)); // add a catch block to log any errors
	};
	fetch("http://localhost:8080/api/pixabay")
		.then((response) => response.json())
		.then((images) => {
			console.log(images, "from pixabay");
		})
		.catch((error) => console.error(error)); // add a catch block to log any errors
	const loadAudio = () => {
		fetch("http://localhost:8080/api/mw")
			.then((response) => response.json())
			.then((audio) => {
				setAudio(audio);
				console.log(audio, "from mw");
			})
			.catch((error) => console.error(error)); // add a catch block to log any errors
	};

	useEffect(() => {
		loadCards();
	}, []);
	useEffect(() => {
		loadAudio();
	}, []);
	return (
		<div>
			<ul className="card-container">
				{cards.map((card) => {
					return (
						<li className="card-list" key={card.id}>
							<Card card={card} audio={audio} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ViewCards;
