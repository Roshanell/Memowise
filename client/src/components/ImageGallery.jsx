import React from "react";
import NextCardButton from "./NextCardButton";

function ImageGallery({ searchResults }) {
	console.log(searchResults);
	return (
		<div>
			<div class="container">
				<h1 class="heading">Results from image search</h1>
				<div class="gallery-item">
					{searchResults
						? searchResults.map((result) => {
								return (
									<img
										class="gallery-image"
										src={result}
										alt="man wearing a black jacket, white shirt, blue jeans, and brown boots, playing a white electric guitar while sitting on an amp"
									/>
								);
						  })
						: null}
				</div>
				<div className="image-gallery-navigation">
					<NextCardButton />
					<NextCardButton />
				</div>
			</div>
		</div>
	);
}

export default ImageGallery;
