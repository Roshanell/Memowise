import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Banner from "../components/Banner";
import loadCards from "../apis/loadCards";
import Searchbar from "../components/Searchbar";
import { useAuth0 } from "@auth0/auth0-react";
import Instructions from "../components/Instructions";

function ViewCards() {
	const [cards, setCards] = useState([]); // State variable to store the cards
	const [audio, setAudio] = useState([]); // State variable for audio (not used in this code)
	const { user } = useAuth0(); // Destructuring the user object from Auth0
	const [globalSearchText, setGlobalSearchText] = useState(""); // State variable for global search text
	const [filteredCards, setFilteredCards] = useState(null); // State variable for filtered cards
	const personalizedInstructions =
		"1. Searching Cards: Enter keywords in the search bar to find specific cards.\n2. Reviewing Cards: Click on a card to view its details and contents.";

	const handleSearch = (searchText) => {
		setGlobalSearchText(searchText); // Update the global search text
	};

	const loadCardsData = async () => {
		setCards(await loadCards(user)); // Load cards for admin
	};

	useEffect(() => {
		if (user) {
			// const isAdmin = user?.email === "dteacher422@gmail.com"; // Check if the user is an admin?
			loadCardsData(); // Call the loadCardsData function when the component mounts or when user or isAdmin changes
		}
	}, [user]);

	// const newFilteredCards = cards.filter((card) => {
	// 	console.log(card);
	// 	Object.values(card)
	// 		.join("")
	// 		.toLowerCase()
	// 		.includes(globalSearchText.toLowerCase());
	// });

	const findCards = () => {
		if (globalSearchText === "") setFilteredCards(null);
		return cards.filter((card) =>
			Object.values(card)
				.join("")
				.toLowerCase()
				.includes(globalSearchText.toLowerCase())
		);
	};

	useEffect(() => {
		// const newFilteredCards = isAdmin
		// 	? cards // For admin, display all cards
		// 	: cards.filter((card) =>
		// 			Object.values(card)
		// 				.join("")
		// 				.toLowerCase()
		// 				.includes(globalSearchText.toLowerCase())
		// 	  ); // For regular users, filter cards based on search text

		setFilteredCards(findCards()); // Update the filtered cards
	}, [globalSearchText]);

	const onDelete = async (card) => {
		console.log(card, "delete method");
		let url = `http://localhost:8080/api/cards/${card.id}`;
		// if (isAdmin) {
		// 	url = `http://localhost:8080/api/admin/cards/${card.id}`; // Modify the URL for admin deletion
		// }
		try {
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (response.ok) {
				// const loadCardsData = async () => {
				// 	if (isAdmin) {
				// 		setCards(await loadCards()); // Reload cards for admin after deletion
				// 	} else {
				// 		setCards(await loadCards(user)); // Reload cards for regular user after deletion
				// 	}
				// };
				loadCardsData(); // Call the loadCardsData function to update the cards
				setFilteredCards(findCards());
			}
		} catch (e) {
			console.error(e); // Log any errors that occur during deletion
		}
	};

	return (
		cards && (
			<div>
				<Banner />
				<div>
					<Instructions personalizedInstructions={personalizedInstructions} />
					<Searchbar onSearch={handleSearch} />
					<ul className="card-container">
						{filteredCards === null
							? cards.map((card) => {
									return (
										<li className="card-list" key={card.id}>
											<Card card={card} audio={audio} toDelete={onDelete} />
										</li>
									);
							  })
							: filteredCards.map((card) => {
									return (
										<li className="card-list" key={card.id}>
											<Card card={card} audio={audio} toDelete={onDelete} />
										</li>
									);
							  })}
					</ul>
				</div>
			</div>
		)
	);
}

export default ViewCards;
