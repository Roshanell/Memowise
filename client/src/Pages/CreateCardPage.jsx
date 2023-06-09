import React from "react";
import CreateCardForm from "../components/CreateCardForm";
import ImageGallery from "../components/ImageGallery";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Generate from "../components/Generate";
import { useState, useEffect } from "react";
import SearchMedia from "../components/SearchMedia";
import Instructions from "../components/Instructions";

function CreateCardPage() {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;
	const [imageSearch, setImageSearch] = useState("");
	const [audioSearch, setAudioSearch] = useState("");
	const [audioUrl, setAudioUrl] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const personalizedInstructions = `Create a Card:

Fill card details: Title, description, and relevant information. Add extra content if needed.
Search Image: Enter topic, browse or use keywords. Copy image URL and paste into the image field.
Search Audio: Search desired word, copy its URL, and paste into the audio field.
Click "Search Media" for results to appear.
`;

	const handleImageSearch = (event) => {
		const imageSearch = event.target.value;
		// console.log(imageSearch);
		setImageSearch(imageSearch);
	};
	const handleAudioSearch = (event) => {
		const audioSearch = event.target.value;
		// console.log(audioSearch);
		setAudioSearch(audioSearch);
	};


	const handleSubmit = (event) => {
		event.preventDefault();
		getMedia();
		getAudio();
		// clearForm();
	};

	const getMedia = () => {
		return fetch(`${API}/pixabay?query=${imageSearch}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				// console.log("from pixabay", data);
				setSearchResults(data);
			});
	};


	const getAudio = () => {
		fetch(`${API}/mw?query=${audioSearch}`)
			.then((response) => response.json())
			.then((audio) => {
				// console.log(audio, "from mw");
				if (!audio.data || !audio.data[0].hwi || !audio.data[0].hwi.prs) {
					// Handle case where pronunciation data is not available
					alert("No pronunciation available for this word.");
					// Handle this situation accordingly, such as displaying a message to the user
					return;
				}

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
				// console.log(subdirectory, "subdirectory");
				let audiourl = `https://media.merriam-webster.com/audio/prons/${language_code}/${country_code}/${format}/${subdirectory}/${audioString}.${format}`;
				setAudioUrl(audiourl);

				// console.log(audiourl);
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
					<Instructions personalizedInstructions={personalizedInstructions} />
					<div className="create-card-content-container">
						<div className="searchMedia">
							<CreateCardForm />
							<SearchMedia
								handleSubmit={handleSubmit}
								handleAudioSearch={handleAudioSearch}
								handleImageSearch={handleImageSearch}
								imageSearch={imageSearch}
								audioSearch={audioSearch}
								audioUrl={audioUrl}
							/>
						</div>
						<div>
							<ImageGallery searchResults={searchResults} />
						</div>
					</div>
				</Tab>
				<Tab eventKey="Generate" title="Generate with AI" className="tabs">
					<Generate />
				</Tab>
			</Tabs>
		</div>
	);
}

export default CreateCardPage;
