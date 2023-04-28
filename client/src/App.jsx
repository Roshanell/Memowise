import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListStudents from "./components/ListStudents";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

import Game from "./components/Game";

function App() {
	return (
		<div className="App">
			<MyNavBar />
			<Banner />
			<ListStudents />
			<Game />
			
			<Footer />
		</div>
	);
}

export default App;
