import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Banner from "../components/Banner";
import loadCards from "../apis/loadCards";
import Searchbar from "../components/Searchbar";
import { useAuth0 } from "@auth0/auth0-react";
import Instructions from "../components/Instructions";

function ViewCards() {
	const [cards, setCards] = useState([]);
	const [audio, setAudio] = useState([]);
	const { user } = useAuth0();
	const [globalSearchText, setGlobalSearchText] = useState("");
	const [filteredCards, setFilteredCards] = useState(null);
	const personalizedInstructions =
		"1. Searching Cards: Enter keywords in the search bar to find specific cards.\n2. Reviewing Cards: Click on a card to view its details and contents.";

	const handleSearch = (searchText) => {
		setGlobalSearchText(searchText);
	};

	const loadCardsData = async () => {
		setCards(await loadCards(user));
	};

	useEffect(() => {
		if (user) {
			loadCardsData();
		}
	}, [user]);

	useEffect(() => {
		setFilteredCards(findCards());
	}, [globalSearchText, cards]);

	const findCards = () => {
		if (globalSearchText === "") return null;
		return cards.filter((card) =>
			Object.values(card)
				.join("")
				.toLowerCase()
				.includes(globalSearchText.toLowerCase())
		);
	};

	const onDelete = async (card) => {
		try {
			let url = `http://localhost:8080/api/cards/${card.id}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (response.ok) {
				loadCardsData();
				setFilteredCards(findCards());
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<Banner />
			<div>
				<Instructions personalizedInstructions={personalizedInstructions} />
				<Searchbar onSearch={handleSearch} />
				<ul className="card-container">
					{(filteredCards === null ? cards : filteredCards).map((card) => (
						<li className="card-list" key={card.id}>
							<Card card={card} audio={audio} toDelete={onDelete} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ViewCards;
