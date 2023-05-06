import React from "react";
import CreateCardForm from "../components/CreateCardForm";
import ImageGallery from "../components/ImageGallery";
import Button from "react-bootstrap/esm/Button";

import { useState, useEffect } from "react";

function CreateCardPage(props) {
	const [search, setSearch] = useState({
		imagesearch: "",
		audiosearch: "",
	});
	const [audioUrl, setAudioUrl] = useState("");

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSearch((prevSearch) => ({ ...prevSearch, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getMedia();
		getAudio();
	};

	const getMedia = () => {
		return fetch(`http://localhost:8080/api/pixabay`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
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
				console.log(audio, "from mw");
				let audioString = audio.data[0].hwi.prs[0].sound.audio;
				let language_code = "en";
				let country_code = "us";
				let format = "mp3";
				let subdirectory = "";

				if (audioString.startsWith("bix")) {
					subdirectory += "bix";
				} else if (audioString.startsWith("gg")) {
					subdirectory += "gg";
				} else if (
					audioString.match(
						/[\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(audioString)
					)
				) {
					subdirectory += "number";
				} else {
					subdirectory += audioString[0];
				}
				console.log(subdirectory, "subdirecotry");
				let audiourl = `https://media.merriam-webster.com/audio/prons/${language_code}/${country_code}/${format}/${subdirectory}/${audioString}.${format}`;
				setAudioUrl(audiourl);
				console.log(audiourl);
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
					onChange={handleInputChange}
					required
				/>

				<input
					type="text"
					name="audiosearch"
					onChange={handleInputChange}
					placeholder="Search for an audio"
					required
				/>
				<Button variant="primary" type="submit">
					Search Media
				</Button>
			</form>

			<h1>Audio URL: {audioUrl}</h1>
			<audio src={audioUrl} controls />

			<CreateCardForm />
			<ImageGallery />
		</div>
	);
}

export default CreateCardPage;
