const API = import.meta.env.VITE_APP_API_SERVER_URL;
const loadCards = async (user) => {
	try {
		user?.email;
		if (user.email === "dteacher422@gmail.com") {
			// If the user is the admin (teacher) account, load all cards
			const cards = await fetch(`${API}/cards`).then((response) =>
				response.json()
			);
			console.log(user);
			// console.log(cards);
			return cards;
		} else {
			// If it's a regular user, load their own cards based on user.sub
			const cards = await fetch(`${API}/cards/${user.sub}`).then((response) =>
				response.json()
			);
			// console.log(cards);
			return cards;
		}
	} catch (e) {
		console.error(e);
		return [];
	}
};

export default loadCards;
