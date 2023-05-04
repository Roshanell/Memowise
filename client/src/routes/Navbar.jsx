import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function MyNavBar(props) {
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	console.log(user);

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
					<Link className="nav-link" to="/card:id">
						View Cards
					</Link>
					<Link className="nav-link" to="/create">
						Create Card
					</Link>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						 {!user ? null : <Nav.Link href="/user-profile">{user.name}</Nav.Link>} 
						<Navbar.Text>
							{!isAuthenticated ? (
								<Link onClick={() => loginWithRedirect()} className="nav-link">
									Log In
								</Link>
							) : (
								<Link
									className="nav-link"
									onClick={() =>
										logout({
											logoutParams: { returnTo: window.location.origin },
										})
									}
								>
									{user.name} please Log Out
								</Link>
							)}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
export default MyNavBar;
