import Button from "./Button";

// this component is strictly for css and styling
const Banner = () => {
	return (
		<div>
			<div className="banner-container">
				<div className="banner-box-one"></div>
				<div className="banner-box-two"></div>

				{/* <div className="create-card-options">
				<div className="css-button-retro--sand "> Create A Card</div>
				<div className="css-button-retro--sand "> Create A Card</div>
			</div> */}
			</div>
			{/* TO DO: Move buttons in proper position and change names dynamically */}
			{/* <Button />
			<Button /> */}
		</div>
	);
};

//TO DO- add overlays and title to this section

export default Banner;
