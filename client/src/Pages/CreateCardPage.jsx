import React from "react";
import CreateCardForm from "../components/CreateCardForm";
import ImageGallery from "../components/ImageGallery";
import Button from "react-bootstrap/esm/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Generate from "../components/Generate";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Form from "react-bootstrap/Form";


function CreateCardPage() {
	const [imageSearch, setImageSearch] = useState("");
	const [audioSearch, setAudioSearch] = useState("");
	const [audioUrl, setAudioUrl] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	// const [imageResults, setImageResults] = useState("");

	const handleImageSearch = (event) => {
		const imageSearch = event.target.value;
		console.log(imageSearch);
		setImageSearch(imageSearch);
	};
	const handleAudioSearch = (event) => {
		const audioSearch = event.target.value;
		console.log(audioSearch);
		setAudioSearch(audioSearch);
	};

	// let clearForm = () => {
	// 	setImageSearch((imageSearch = ""));
	// 	setAudioSearch((audioSearch = ""));
	// };

	const handleSubmit = (event) => {
		event.preventDefault();
		getMedia();
		getAudio();
		// clearForm();
	};

	const getMedia = () => {
		return fetch(`http://localhost:8080/api/pixabay?query=${imageSearch}`, {
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
				setSearchResults(data);
			});
	};

	const getAudio = () => {
		fetch(`http://localhost:8080/api/mw?query=${audioSearch}`)
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
			<Tabs
				defaultActiveKey="profile"
				id="uncontrolled-tab-example"
				className="mb-3"
			>
				<Tab eventKey="Create" title="Create a Card" className="tabs">
					<CreateCardForm />
				</Tab>
				<Tab eventKey="Generate" title="Generate with AI" className="tabs">
					<Generate />
				</Tab>

				<Tab eventKey="contact" title="Search for Media">
					<form onSubmit={handleSubmit} className="create-card-form">
						<Form.Label className="create-card-inputs">
							Enter a image search term{" "}
						</Form.Label>
						<input
							type="text"
							name="imagesearch"
							value={imageSearch}
							placeholder="Search for an image"
							onChange={handleImageSearch}
							required
						/>
						<Form.Label className="create-card-inputs">
							Enter a audio search term{" "}
						</Form.Label>
						<input
							type="text"
							name="audiosearch"
							value={audioSearch}
							onChange={handleAudioSearch}
							placeholder="Search for an audio"
							required
						/>

						<button className="submit-button" type="submit">
							Search Media
						</button>
					</form>

					<h1>Audio URL: {audioUrl}</h1>
					<audio src={audioUrl} controls />

					<ImageGallery searchResults={searchResults} />
				</Tab>
			</Tabs>
		</div>
	);
}

export default CreateCardPage;
