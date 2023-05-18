const Button = ({ children, clickHandler }) => {
	return <button className="css-button-retro--green" onClick={clickHandler}>{children}</button>;
};

export default Button;