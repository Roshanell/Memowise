import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const CreateCard = () => {
	return (
		<div className="create-card">
			<CreateCardModal />

			<InputGroup className="mb-3">
				<Form.Control
					aria-label="Dollar amount (with dot and two decimal places)"
					placeholder="Enter your word to seach for image"
				/>
			</InputGroup>

			<InputGroup>
				<Form.Control
					aria-label="Dollar amount (with dot and two decimal places)"
					placeholder="Enter your word to seach for audio"
				/>
			</InputGroup>
		</div>
	);
};
export default CreateCard;
