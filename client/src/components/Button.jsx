const Button = ({ children, clickHandler }) => {
	// returns a button
	return <button className="css-button-retro--green" onClick={clickHandler}>{children}</button>;
};

export default Button;