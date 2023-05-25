import React, { useState, useEffect } from "react";
import Instructions from "../components/Instructions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function StudentsData() {
	const personalizedInstructions = `Select a student's name to see thier data`;
	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetchStudents();
	}, []);

	async function fetchStudents() {
		try {
			const response = await fetch("/api/students");
			const data = await response.json();
			setStudents(data);
		} catch (error) {
			console.error("Error fetching students:", error);
		}
	}
	return (
		<div>
			<Instructions personalizedInstructions={personalizedInstructions} />{" "}
			<DropdownButton id="dropdown-basic-button" title="Dropdown button">
				{students.map((student) => (
					<Dropdown.Item key={student.id} href={`#/action-${students.id}`}>
						{student.name}
					</Dropdown.Item>
				))}
			</DropdownButton>
		</div>
	);
}

export default StudentsData;
