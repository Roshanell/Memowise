import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Student from "./Student";

const ListStudents = () => {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;
	// this is my original state with an array of students
	const [students, setStudents] = useState([]);

	//this is the state needed for the UpdateRequest
	const [editingStudent, setEditingStudent] = useState(null);

	const loadStudents = () => {
		fetch(`${API}/students`)
			.then((response) => response.json())
			.then((students) => {
				setStudents(students);
				// console.log(students, "list of students");
			})
			.catch((error) => console.error(error)); // add a catch block to log any errors
	};

	useEffect(() => {
		loadStudents();
	}, []);

	const onSaveStudent = (newStudent) => {
		// console.log(newStudent, "From the parent - List of Students");
		setStudents((students) => [...students, newStudent]);
	};

	//A function to control the update in the parent (student component)
	const updateStudent = (savedStudent) => {
		// console.log("Line 29 savedStudent", savedStudent);
		// This function should update the whole list of students -
		loadStudents();
	};

	//A function to handle the Delete funtionality
	const onDelete = (student) => {
		//console.log(student, "delete method")
		return fetch(`${API}/students/${student.id}`, {
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
		</div>
	);
};

export default ListStudents;
