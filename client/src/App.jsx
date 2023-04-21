import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListStudents from "./components/ListStudents";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App">
			<MyNavBar />
			<ListStudents />
			<Footer />
		</div>
	);
}

export default App;
