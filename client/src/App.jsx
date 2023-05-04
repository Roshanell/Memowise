import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListStudents from "./components/ListStudents";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import CreateCard from "./components/CreateCards";
import Game from "./components/Game";
import Roster from "./Pages/Roster";
import Home from "./Pages/Home";
import ViewCard from "./Pages/ViewCard";
import PlayGame from "./Pages/PlayGame";
import AboutMe from "./Pages/AboutMe";
import FAQs from "./Pages/FAQs";

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Outlet,
	Route,
} from "react-router-dom";
import CreateCardPage from "./Pages/CreateCardPage";

// general structure of pages
const Layout = () => {
	return (
		<div className="layout">
			<header>
				<MyNavBar />
				<Banner />
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
			<Route path="/card:id" element={<ViewCard />} />
			<Route path="/game" element={<Game />} />
			<Route path="/aboutMe" element={<AboutMe />} />
			<Route path="/FAQs" element={<FAQs />} />
			<Route path="/" element={<Home />} />
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
