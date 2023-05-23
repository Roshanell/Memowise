const Instructions = ({ personalizedInstructions }) => {
	return (
		<div className="instructions">
			<img src="https://i.imgur.com/xVBWx5m.png" className="arrow" />
			<span>{personalizedInstructions}</span>
			<img src="https://i.imgur.com/QNAwz2T.png" />
			<img src="https://i.imgur.com/gD2VzQh.png" />
		</div>
	);
};

export default Instructions;
