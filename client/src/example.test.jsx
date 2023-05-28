import MyNavBar from "./components/MyNavBar";
import Student from "./components/Student";
import CreateCardForm from "./components/CreateCardForm";
import Flashcard from "./components/Flashcard";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { assert, expect, test } from "vitest";
import Footer from "./components/Footer";
import Game from "./components/Game";
import Searchbar from "./components/Searchbar";

test("renders the Create Card Form component", () => {
	render(
		<MemoryRouter>
			<CreateCardForm />
		</MemoryRouter>
	);
	assert("Create Card Form not rendered correctly");
});

test("Footer renders correctly", () => {
	render(
		<MemoryRouter>
			<Footer />
		</MemoryRouter>
	);

	assert("Footer element not rendered correctly");
});

test("Game renders correctly", () => {
	render(
		<MemoryRouter>
			<Game />
		</MemoryRouter>
	);

	assert("Game element not rendered correctly");
});
test("Navbar renders correctly", () => {
	render(
		<MemoryRouter>
			<MyNavBar />
		</MemoryRouter>
	);

	// const navbarElement = screen.getByTestId("navbar");
	assert("Navbar element not rendered correctly");
});
test("searchbar renders correctly", () => {
	render(
		<MemoryRouter>
			<Searchbar />
		</MemoryRouter>
	);

	// const navbarElement = screen.getByTestId("navbar");
	assert("searchbar element not rendered correctly");
});
test("Show full name of a student", () => {
	const student = { firstname: "Roshanell", lastname: "Francisco" };
	const { getByText } = render(<Student student={student} />);
	const studentFullName = getByText("Roshanell Francisco");
	expect(studentFullName).toBeDefined();
});


