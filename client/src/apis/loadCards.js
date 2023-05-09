const loadCards = async () => {
	try {
		//fetch returns a promise
		const cards = await fetch("http://localhost:8080/api/cards")
			// must use the .json method
			.then((response) => response.json());
		console.log(cards);
		return cards;
	} catch (e) {
		console.error(error); // add a catch block to log any errors
	}
};

export default loadCards;
