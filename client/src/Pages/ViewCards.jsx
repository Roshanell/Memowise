import React, { useCallback } from "react";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import loadCards from "../apis/loadCards";

function ViewCards() {
	const [cards, setCards] = useState([]);
	const [audio, setAudio] = useState([]);

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
	const onDelete = async (card) => {
		console.log(card, "delete method");
		return await fetch(`http://localhost:8080/api/cards/${card.id}`, {
			method: "DELETE",
		}).then((response) => {
			//console.log(response);
			if (response.ok) {
				loadCards().then(setCards);
			}
		});
	};

	// const getCards = useCallback(async () => {
	// 	const _cards = await loadCards();
	// 	setCards(_cards);
	// }, []);
	useEffect(() => {
		loadAudio();
		// getCards();
		// alternate way of doing async await
		loadCards().then(setCards);
	}, []);

	return (
		<div>
			<Banner />
			<div>
				<ul className="card-container">
					{cards.map((card) => {
						return (
							<li className="card-list" key={card.id}>
								<Card card={card} audio={audio} toDelete={onDelete} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default ViewCards;
