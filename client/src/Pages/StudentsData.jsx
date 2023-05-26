import React, { useState, useEffect } from "react";
import Instructions from "../components/Instructions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "../components/Card";

function StudentsData() {
	const personalizedInstructions = `Select a student's name to see thier data`;
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [studentCards, setStudentCards] = useState(null);
	useEffect(() => {
		fetchStudents();
	}, []);

	async function fetchStudents() {
		try {
			const response = await fetch("http://localhost:8080/api/students");
			const data = await response.json();
			console.log(data);
			setStudents(data);
		} catch (error) {
			console.log("Error fetching students:", error);
		}
	}

	const handleOnSelect = (e) => {
		setSelectedStudent(e);
		loadStudents(e);
	};

	const loadStudents = async (student) => {
		console.log("This is the selected student id: ", student);
		try {
			const cards = await fetch(
				`http://localhost:8080/api/cards/${student}`
			).then((response) => response.json());
			console.log("This is the returned cards data: ", cards);
			setStudentCards(cards);
		} catch (e) {
			console.error(e);
			return [];
		}
	};

	return (
		<div>
			<Instructions personalizedInstructions={personalizedInstructions} />{" "}
			<Dropdown
				variant="secondary"
				id="dropdown-basic"
				onSelect={handleOnSelect}
			>
				<Dropdown.Toggle variant="secondary" id="dropdown-basic">
					{/* {sel ? selectedStudent : "Select a Student"} */}
					Select a student
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
					{students.map((student) => (
						<Dropdown.Item
							key={`Student+${student.firstname}`}
							eventKey={`${student.studentid}`}
						>
							{student.firstname}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<div>
				{studentCards ? studentCards.map((card) => <Card card={card} />) : null}
			</div>
		</div>
	);
}

export default StudentsData;
