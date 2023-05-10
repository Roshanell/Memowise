const NextCardButton = ({ icon, onClick }) => {
	return (
		<div className="css-button-retro--blue" onClick={onClick}>
			{icon}
		</div>
	);
};

export default NextCardButton;
