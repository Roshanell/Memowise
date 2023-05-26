import MyNavBar from "./components/MyNavBar";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Student from "./components/Student";
import Game from "./components/Game"

// test("Navbar renders correctly", () => {
// 	const { getByTestId } = render(<MyNavBar />);
// 	const navbarElement = getByTestId("navbar");
// 	expect(navbarElement).toBeDefined();
// });



test("Show full name of a student", () => {
	const student = { firstname: "Patricia", lastname: "Briggs" };
	const { getByText } = render(<Student student={student} />);
	const studentFullName = getByText("Patricia Briggs");
	expect(studentFullName).toBeDefined();
});






