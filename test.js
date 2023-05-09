let card = [3, 4, 5, 6, 7];

let currentIndex = 0;
let startingItem = card[currentIndex];

const setStartingItemToPreviousItem = () => {
	if (currentIndex === 0) {
		currentIndex = card.length - 1;
	} else {
		currentIndex--;
	}
	const previousItem = card[currentIndex];
	startingItem = previousItem;
};

console.log(startingItem); // 3
setStartingItemToPreviousItem();
console.log(startingItem); // 7
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
setStartingItemToPreviousItem();
console.log(startingItem); // 6
