import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../assets/BlueTechtonicaWord.png";

function MyNavBar(props) {
	return (
		<>
			<Navbar bg="dark" variant="dark" sticky="top">
				<Container>
					{/* <Navbar.Brand href="/">
						<img
							src={Logo}
							height="30"
							className="d-lg-inline-block"
							alt="React Bootstrap logo"
						/>
					</Navbar.Brand> */}
					<Nav.Link>
						<a href="#Home">Home </a>
					</Nav.Link>
					<Nav.Link>
						{" "}
						<a href="#Inventory">Inventory</a>
					</Nav.Link>
					<Nav.Link>
						<a href="#Roster">Roster </a>
					</Nav.Link>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							Signed in as: <a href="#login">Teacher's Name</a>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default MyNavBar;
