import React from "react";
import NextCardButton from "./NextCardButton";

function ImageGallery({ searchResults }) {
	const handleImageClick = (imageUrl) => {
		window.prompt("Copy this URL", imageUrl);
	};
	return (
		<div>
			<div class="container">
				<h1 class="heading">Results from image search</h1>
				<div className="gallery">
					<div class="gallery-item">
						{searchResults
							? searchResults.map((result) => {
									return (
										<img
											class="gallery-image"
											src={result}
											onClick={() => handleImageClick(result)}
											style={{ cursor: "pointer" }}
										/>
									);
							  })
							: null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageGallery;
