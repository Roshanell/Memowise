import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListStudents from "./components/ListStudents";
import Footer from "./components/Footer";
import Banner from "./Banner";
import Button from "./components/Button";

function App() {
	return (
		<div className="App">
			<MyNavBar />
			<Banner />
			<ListStudents />
			<Button />
			<Footer />
		</div>
	);
}

export default App;
