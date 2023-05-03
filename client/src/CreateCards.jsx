import ListGroup from "react-bootstrap/ListGroup";
import CreateCardModal from "./components/CreateCardModal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Carousel from "react-bootstrap/Carousel";
const CreateCard = () => {
	return (
		<div className="create-card">
			{/* carosel of images */}
			<Carousel className="carousel">
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="hhttps://pixabay.com/photos/rose-flower-petals-red-rose-320868/"
						alt="First slide"
					/>
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="holder.js/800x400?text=Second slide&bg=282c34"
						alt="Second slide"
					/>

					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="holder.js/800x400?text=Third slide&bg=20232a"
						alt="Third slide"
					/>

					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			<CreateCardModal />
			{/* <InputGroup className="mb-3">
				<InputGroup.Text>Search For Image Link</InputGroup.Text>

				<Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
			</InputGroup> */}

			{/* TO DO: render all images of with link; can I preview the link andimage at the same time? */}
			{/* <InputGroup>
				<Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
				<InputGroup.Text>$</InputGroup.Text>
				<InputGroup.Text>0.00</InputGroup.Text>
			</InputGroup> */}
		</div>
	);
};
export default CreateCard;
