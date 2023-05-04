import ListGroup from "react-bootstrap/ListGroup";
import CreateCardModal from "./CreateCardModal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CreateCardForm from "./CreateCardForm";
const CreateCard = () => {
	// {
	// 	/* map over hits here since hits is an array of strings */
	// }
	// console.log(hits)
	return (
		<div className="create-card">
			<CreateCardModal />
			
			<InputGroup className="mb-3">
				<Form.Control
					aria-label="Dollar amount (with dot and two decimal places)"
					placeholder="Enter your word to seach for image"
				/>
			</InputGroup>

			{/* TO DO: render all images of with link; can I preview the link andimage at the same time? */}
			{/* TO DO: format images in carousel*/}
			<InputGroup>
				<Form.Control
					aria-label="Dollar amount (with dot and two decimal places)"
					placeholder="Enter your word to seach for audio"
				/>
			</InputGroup>
			{/* carosel of images */}
		</div>
	);
};
export default CreateCard;
