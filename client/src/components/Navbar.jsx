import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function MyNavBar(props) {
	return (
		<>
			<Navbar sticky="top" className="nav-bar">
				<Container>
					<Link className="nav-link" to="/">
						Home
					</Link>
					<Link className="nav-link" to="/game">
						Game
					</Link>
					<Link className="nav-link" to="/roster">
						Roster
					</Link>
					<Link className="nav-link" to="card:id">
						View Cards
					</Link>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							<Link className="nav-link" to="#">
								Login
							</Link>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default MyNavBar;
