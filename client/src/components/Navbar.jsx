import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function MyNavBar(props) {
	return (
		<>
			<Navbar sticky="top" className="nav-bar">
				<Container>
					{/* <Nav.Link href="#Home" className="nav-link">
						Home
					</Nav.Link> */}
					<Link className="nav-link" to="/"> 
					</Link>
					<Nav.Link href="#Game" className="nav-link">
						Game
					</Nav.Link>
					{/* <Nav.Link href="#Roster" className="nav-link">
						Roster
					</Nav.Link> */}
					<Link className="nav-link" to="/roster">
						Roster
					</Link>

					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							<Nav.Link href="#login" className="nav-link">
								Login
							</Nav.Link>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default MyNavBar;
