const loadCards = async (user) => {
	try {
		//fetch returns a promise
		const cards = await fetch(`http://localhost:8080/api/cards/${user.sub}`)
			// must use the .json method
			.then((response) => response.json());
		console.log(cards);
		return cards;
	} catch (e) {
		return [];
		console.error(e); // add a catch block to log any errors
	}
};

export default loadCards;
