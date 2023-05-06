import React from "react";
import CreateCardForm from "../components/CreateCardForm";
import ImageGallery from "../components/ImageGallery";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";

function CreateCardPage(props) {
	// console.log(audio)
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
		getAudio();
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
					// console.log(data)
					return response.json();
					//loadStudents();
				}
			})
			.then((data) => {
				console.log("from pixabay", data);
				console.log(data);
			});
	};
	const getAudio = () => {
		fetch("http://localhost:8080/api/mw")
			.then((response) => response.json())
			.then((audio) => {
				// setAudio(audio);
				console.log(audio, "from mw");
			})
			.catch((error) => console.error(error));
	};
	return (
		<div>
			<form onSubmit={handleSubmit} className="create-card-form">
				<input
					type="text"
					name="imagesearch"
					placeholder="Search for an image"
					// value={}
					onChange={handleInputChange}
					required
				/>

				<input
					type="text"
					name="audiosearch"
					// value={card.answer}
					onChange={handleInputChange}
					placeholder="Search for an audio"
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
