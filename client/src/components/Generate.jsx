import React from "react";

function Generate() {
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSearch((prevSearch) => ({ ...prevSearch, [name]: value }));
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		clearForm();
	};
	return (
		<div>
			<form onSubmit={handleSubmit} className="create-card-form">
				<input
					type="text"
					name="generate card"
					onChange={handleInputChange}
					placeholder="Enter topic"
					required
				/>
				<input
					type="number of cards"
					name="generate card"
					onChange={handleInputChange}
					placeholder="Enter number"
					required
				/>
				<input
					type="number"
					name="rade level"
					onChange={handleInputChange}
					placeholder="Enter grade"
					required
				/>
			</form>
		</div>
	);
}

export default Generate;
