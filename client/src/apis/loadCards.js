const loadCards = async (user) => {
	try {
		if (!user || !user.sub) {
			// If user or user.sub is undefined, return an empty array
			return [];
		}

		if (user.email === "dteacher422@gmail.com") {
			// If the user is the admin (teacher) account, load all cards
			const cards = await fetch("http://localhost:8080/api/cards").then(
				(response) => response.json()
			);
			console.log(cards);
			return cards;
		} else {
			// If it's a regular user, load their own cards based on user.sub
			const cards = await fetch(
				`http://localhost:8080/api/cards/${user.sub}`
			).then((response) => response.json());
			console.log(cards);
			return cards;
		}
	} catch (e) {
		console.error(e);
		return [];
	}
};

export default loadCards;
