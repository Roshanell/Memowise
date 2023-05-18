import React from "react";
import Form from "react-bootstrap/Form";
function SearchMedia({
	handleAudioSearch,
	handleImageSearch,
	handleSubmit,
	imageSearch,
	audioSearch,
	audioUrl,
}) {
	return (
		<div>
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
		</div>
	);
}

export default SearchMedia;
