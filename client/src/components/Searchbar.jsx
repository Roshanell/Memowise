import React, { useState } from "react";

const Searchbar = ({ onSearch }) => {
	const [searchVal, setSearchVal] = useState("");

	const handleInput = (e) => {
		const value = e.target.value;
		setSearchVal(value);
		onSearch(value);
	};

	return (
		<div className="input-wrap">
			<input
				onChange={handleInput}
				value={searchVal}
				type="text"
				name="card-search"
				id="card-search"
				placeholder="Search Cards"
			/>
		</div>
	);
};

export default Searchbar;
