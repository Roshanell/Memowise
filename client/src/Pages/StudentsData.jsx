import React, { useState, useEffect } from "react";
import Instructions from "../components/Instructions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function StudentsData() {
	const personalizedInstructions = `Select a student's name to see thier data`;
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);

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
	return (
		<div>
			<Instructions personalizedInstructions={personalizedInstructions} />{" "}
			<Dropdown
				variant="secondary"
				id="dropdown-basic"
				onSelect={(e) => setSelectedStudent(e)}
			>
				<Dropdown.Toggle variant="secondary" id="dropdown-basic">
					{selectedStudent ? selectedStudent : "Select a Student"}
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
					{students.map((student) => (
						<Dropdown.Item
							key={`Student+${student.firstname}`}
							eventKey={`${student.firstname}`}
						>
							{student.firstname}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

export default StudentsData;
