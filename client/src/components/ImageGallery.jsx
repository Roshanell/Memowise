import React from "react";
import NextCardButton from "./NextCardButton";

function ImageGallery({ searchResults }) {
	const handleImageClick = (imageUrl) => {
		window.prompt("Copy this URL", imageUrl);
	};
	return (
		<div>
			<div className="container">
				<h1 className="heading">Results from image search</h1>
				<div classNameName="gallery">
					<div className="gallery-item">
						{searchResults
							? searchResults.map((result) => {
									return (
										<img
											className="gallery-image"
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
