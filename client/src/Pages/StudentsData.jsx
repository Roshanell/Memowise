import React, { useState, useEffect } from "react";
import Instructions from "../components/Instructions";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "../components/Card";

function StudentsData() {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;

	const personalizedInstructions = `Select a student's name to see their data`;
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [studentCards, setStudentCards] = useState(null);

	useEffect(() => {
		fetchStudents();
	}, []);

	async function fetchStudents() {
		try {
			const response = await fetch(`${API}/students`);
			const data = await response.json();
			console.log(data);
			setStudents(data);
		} catch (error) {
			console.log("Error fetching students:", error);
		}
	}

	const handleOnSelect = (eventKey) => {
		setSelectedStudent(eventKey);
		loadStudents(eventKey);
	};

	const loadStudents = async (studentId) => {
		console.log("This is the selected student id:", studentId);
		try {
			const cards = await fetch(`${API}/cards/${studentId}`).then((response) =>
				response.json()
			);
			console.log("This is the returned cards data:", cards);
			setStudentCards(cards);
		} catch (error) {
			console.error(error);
			setStudentCards(null);
		}
	};

	return (
		<div>
			<Instructions personalizedInstructions={personalizedInstructions} />
			<Dropdown
				variant="secondary"
				id="dropdown-basic"
				onSelect={handleOnSelect}
			>
				<Dropdown.Toggle variant="secondary" id="dropdown-basic">
					Select a student
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
					{students.map((student) => (
						<Dropdown.Item
							key={`Student+${student.firstname}`}
							eventKey={student.studentid}
						>
							{student.firstname}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			{selectedStudent && (
				<h1 className="selected-student">
					Selected Student:{" "}
					{
						students.find((student) => student.studentid === selectedStudent)
							?.firstname
					}
				</h1>
			)}
			<div className="student-cards">
				{studentCards
					? studentCards.map((card) => <Card card={card} key={card.id} />)
					: null}
			</div>
		</div>
	);
}

export default StudentsData;
