import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../assets/BlueTechtonicaWord.png";

function MyNavBar(props) {
	return (
		<>
			<Navbar sticky="top" className="nav-bar">
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
						<a href="#Home" className="nav-link">
							Home
						</a>
					</Nav.Link>
					<Nav.Link>
						<a href="#Inventory" className="nav-link">
							Inventory
						</a>
					</Nav.Link>
					<Nav.Link>
						<a href="#Roster" className="nav-link">
							Roster
						</a>
					</Nav.Link>

					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							<a href="#login" className="nav-link">
								Login
							</a>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default MyNavBar;
