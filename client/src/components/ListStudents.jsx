import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Student from "./Student";

const ListStudents = () => {
	// this is my original state with an array of students
	const [students, setStudents] = useState([]);

	//this is the state needed for the UpdateRequest
	const [editingStudent, setEditingStudent] = useState(null);

	const loadStudents = () => {
		fetch("http://localhost:8080/api/students")
			.then((response) => response.json())
			.then((students) => {
				setStudents(students);
				console.log(students, "list of students");
			})
			.catch((error) => console.error(error)); // add a catch block to log any errors
	};

	fetch("http://localhost:8080/api/openai")
		.then((response) => response.json())
		.then((data) => {
			console.log(data, "hard-coded data");
		})
		.catch((error) => console.error(error)); // add a catch block to log any errors
	fetch("http://localhost:8080/api/pixabay")
		.then((response) => response.json())
		.then((data) => {
			console.log(data, "from pixabay");
		})
		.catch((error) => console.error(error)); // add a catch block to log any errors
	fetch("http://localhost:8080/api/mw")
		.then((response) => response.json())
		.then((data) => {
			console.log(data, "from mw");
		})
		.catch((error) => console.error(error)); // add a catch block to log any errors

	useEffect(() => {
		loadStudents();
	}, []);

	const onSaveStudent = (newStudent) => {
		console.log(newStudent, "From the parent - List of Students");
		setStudents((students) => [...students, newStudent]);
	};

	//A function to control the update in the parent (student component)
	const updateStudent = (savedStudent) => {
		console.log("Line 29 savedStudent", savedStudent);
		// This function should update the whole list of students -
		loadStudents();
	};

	//A function to handle the Delete funtionality
	const onDelete = (student) => {
		//console.log(student, "delete method")
		return fetch(`http://localhost:8080/api/students/${student.id}`, {
			method: "DELETE",
		}).then((response) => {
			//console.log(response);
			if (response.ok) {
				loadStudents();
			}
		});
	};

	//A function to handle the Update functionality
	const onUpdate = (toUpdateStudent) => {
		//console.log(toUpdateStudent);
		setEditingStudent(toUpdateStudent);
	};

	return (
		<div className="mybody">
			<div className="list-students">
				<h2>Roster</h2>
				<ul>
					{students.map((student) => {
						return (
							<li key={student.id}>
								{" "}
								<Student
									student={student}
									toDelete={onDelete}
									toUpdate={onUpdate}
								/>
							</li>
						);
					})}
				</ul>
			</div>
			<MyForm
				key={editingStudent ? editingStudent.id : null}
				onSaveStudent={onSaveStudent}
				editingStudent={editingStudent}
				onUpdateStudent={updateStudent}
			/>

			{/* map over hits here since hits is an array of strings */}
		</div>
	);
};

export default ListStudents;
