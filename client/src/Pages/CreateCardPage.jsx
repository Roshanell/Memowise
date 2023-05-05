import React from "react";
import CreateCardForm from "../components/CreateCardForm";
import ImageGallery from "../components/ImageGallery";
import Button from "react-bootstrap/esm/Button";

import { useState } from "react";

function CreateCardPage() {
	const [search, setSearch] = useState({
		imagesearch: "",
		audiosearch: "",
	});
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSearch((prevSearch) => ({ ...prevSearch, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getMedia();
		// api call to pixabay and mw post req
	};

	const getMedia = () => {
		
		return fetch(`http://localhost:8080/api/pixabay`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				//console.log(response);
				if (response.ok) {
					console.log("ok");
					return response.json();
					//loadStudents();
				}
			})
			.then((data) => {
				console.log(" the front end", data);
				console.log(data);
			});
	};
	

	return (
		<div>
			<form onSubmit={handleSubmit} className="create-card-form">
				<input
					type="text"
					name="imagesearch"
					// value={}
					onChange={handleInputChange}
					required
				/>

				<input
					type="text"
					name="audiosearch"
					// value={card.answer}
					onChange={handleInputChange}
					required
				/>
				<Button variant="primary" type="submit">
					Search Media
				</Button>
			</form>
			<CreateCardForm />
			<ImageGallery />
		</div>
	);
}

export default CreateCardPage;
