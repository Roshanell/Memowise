import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// This component is for navigating the site
//TO DO - add backgorund overlay and other links for routing purposes
function MyNavBar(props) {
	return (
		<>
			<Navbar sticky="top" className="nav-bar">
				<Container>
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
