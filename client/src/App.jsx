import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/MyNavBar";
import Footer from "./components/Footer";
import Game from "./components/Game";
import Roster from "./Pages/Roster";
import Home from "./Pages/Home";
import ViewCards from "./Pages/ViewCards";
import PlayGame from "./Pages/PlayGame";
import AboutMe from "./Pages/AboutMe";
import FAQs from "./Pages/FAQs";
import Profile from "./components/Profile";
import CreateCardPage from "./Pages/CreateCardPage";

import StudentsData from "./Pages/StudentsData";

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Outlet,
	Route,
} from "react-router-dom";

// general structure of pages
const Layout = () => {
	return (
		<div className="layout">
			<header>
				<MyNavBar />
			</header>
			<main>
				{/* specifc page you route to */}
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		// calls layout funct
		<Route path="/" element={<Layout />}>
			<Route path="/roster" element={<Roster />} />
			{/* <Route path="/home" element={<Home />} /> */}
			<Route path="/create" element={<CreateCardPage />} />
			<Route path="/cards" element={<ViewCards />} />
			<Route path="/game" element={<Game />} />
			<Route path="/aboutMe" element={<AboutMe />} />
			<Route path="/FAQs" element={<FAQs />} />
			<Route path="/" element={<Home />} />
			<Route path="/user-profile" element={<Profile />} />
			<Route path="/students-data" element={<StudentsData />} />
		</Route>
	)
);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
