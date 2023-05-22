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
	const [filteredCards, setFilteredCards] = useState([]); // State variable for filtered cards
	const personalizedInstructions =
		"1. Searching Cards: Enter keywords in the search bar to find specific cards.\n2. Reviewing Cards: Click on a card to view its details and contents.";

	const handleSearch = (searchText) => {
		setGlobalSearchText(searchText); // Update the global search text
	};

	const isAdmin = user?.email === "dteacher422@gmail.com"; // Check if the user is an admin

	useEffect(() => {
		const loadCardsData = async () => {
			if (isAdmin) {
				setCards(await loadCards()); // Load cards for admin (no user parameter)
			} else {
				setCards(await loadCards(user)); // Load cards for regular user (passing user parameter)
			}
		};

		loadCardsData(); // Call the loadCardsData function when the component mounts or when user or isAdmin changes
	}, [user, isAdmin]);

	useEffect(() => {
		const newFilteredCards = isAdmin
			? cards // For admin, display all cards
			: cards.filter((card) =>
					Object.values(card)
						.join("")
						.toLowerCase()
						.includes(globalSearchText.toLowerCase())
			  ); // For regular users, filter cards based on search text

		setFilteredCards(newFilteredCards); // Update the filtered cards
	}, [cards, globalSearchText, isAdmin]);

	const onDelete = async (card) => {
		console.log(card, "delete method");
		let url = `http://localhost:8080/api/cards/${card.id}`;
		if (isAdmin) {
			url = `http://localhost:8080/api/admin/cards/${card.id}`; // Modify the URL for admin deletion
		}
		try {
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (response.ok) {
				const loadCardsData = async () => {
					if (isAdmin) {
						setCards(await loadCards()); // Reload cards for admin after deletion
					} else {
						setCards(await loadCards(user)); // Reload cards for regular user after deletion
					}
				};

				loadCardsData(); // Call the loadCardsData function to update the cards
			}
		} catch (e) {
			console.error(e); // Log any errors that occur during deletion
		}
	};


	return (
		<div>
			<Banner />
			<div>
				<Instructions personalizedInstructions={personalizedInstructions} />
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
