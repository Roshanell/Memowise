import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Banner from "../components/Banner";
import loadCards from "../apis/loadCards";
import Searchbar from "../components/Searchbar";
import { useAuth0 } from "@auth0/auth0-react";

function ViewCards() {
	const [cards, setCards] = useState([]);
	const [audio, setAudio] = useState([]);
	const { user } = useAuth0();
	const [globalSearchText, setGlobalSearchText] = useState("");
	const [filteredCards, setFilteredCards] = useState([]);

	const handleSearch = (searchText) => {
		setGlobalSearchText(searchText);
	};

	useEffect(() => {
		const newFilteredCards = cards.filter((card) =>
			Object.values(card)
				.join("")
				.toLowerCase()
				.includes(globalSearchText.toLowerCase())
		);
		setFilteredCards(newFilteredCards);
	}, [cards, globalSearchText]);

	const onDelete = async (card) => {
		console.log(card, "delete method");
		return await fetch(`http://localhost:8080/api/cards/${card.id}`, {
			method: "DELETE",
		}).then((response) => {
			if (response.ok) {
				loadCards(user).then(setCards);
			}
		});
	};

	useEffect(() => {
		if (user) loadCards(user).then(setCards);
	}, [user]);

	return (
		<div>
			<Banner />
			<div>
				<Searchbar onSearch={handleSearch} />
				<ul className="card-container">
					{filteredCards.map((card) => {
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
