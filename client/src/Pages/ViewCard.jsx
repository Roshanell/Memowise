import React from "react";
import Card from "../components/Card";
import { useState, useEffect } from "react";

function ViewCard() {
	const [cards, setCards] = useState([]);
	const loadCards = () => {
		fetch("http://localhost:8080/api/cards")
			.then((response) => response.json())
			.then((cards) => {
				setCards(cards);
				console.log(cards, "list of cards");
			})
			.catch((error) => console.error(error)); // add a catch block to log any errors
	};
	useEffect(() => {
		loadCards();
	}, []);

	// return <Card />;

	return (
		<ul>
			{cards.map((card) => {
				return (
					<li key={card.id}>
						<Card card={card} />
					</li>
				);
			})}
		</ul>
	);
}

export default ViewCard;
