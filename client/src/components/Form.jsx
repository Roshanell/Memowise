import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const MyForm = ({ onSaveStudent, editingStudent, onUpdateStudent }) => {
	const API = import.meta.env.VITE_APP_API_SERVER_URL;
	// This is the original State with not initial student
	const [student, setStudent] = useState(
		editingStudent || {
			firstname: "",
			lastname: "",
			is_current: false,
			parentfirstname: "",
			parentlastname: "",
			parentemail: "",
			studentid: "",
		}
	);

	//create functions that handle the event of the user typing into the form
	const handleNameChange = (event) => {
		const firstname = event.target.value;
		setStudent((student) => ({ ...student, firstname }));
	};

	const handleLastnameChange = (event) => {
		const lastname = event.target.value;
		setStudent((student) => ({ ...student, lastname }));
	};

	const handleCheckChange = (event) => {
		const is_current = event.target.checked;
		//console.log(iscurrent);
		setStudent((student) => ({ ...student, is_current }));
	};

	const handleParentFirstNameChange = (event) => {
		const parentfirstname = event.target.value;
		setStudent((student) => ({ ...student, parentfirstname }));
	};

	const handleParentLastNameChange = (event) => {
		const parentlastname = event.target.value;
		setStudent((student) => ({ ...student, parentlastname }));
	};

	const handleParentEmailChange = (event) => {
		const parentemail = event.target.value;
		setStudent((student) => ({ ...student, parentemail }));
	};

	const handleStudentId = (event) => {
		const studentid = event.target.value;
		setStudent((student) => ({ ...student, studentid }));
	};
	const clearForm = () => {
		setStudent({
			firstname: "",
			lastname: "",
			is_current: false,
			parentfirstname: "",
			parentlastname: "",
			parentemail: "",
		});
	};

	//A function to handle the post request
	const postStudent = (newStudent) => {
		return fetch(`${API}/students`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newStudent),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//console.log("From the post ", data);
				//I'm sending data to the List of Students (the parent) for updating the list
				onSaveStudent(data);
				//this line just for cleaning the form
				clearForm();
			});
	};

	//A function to handle the post request
	const putStudent = (toEditStudent) => {
		return fetch(`${API}/students/${toEditStudent.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(toEditStudent),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				onUpdateStudent(data);
				//this line just for cleaning the form
				clearForm();
			});
	};

	//A function to handle the submit in both cases - Post and Put request!
	const handleSubmit = (e) => {
		e.preventDefault();
		if (student.id) {
			putStudent(student);
		} else {
			postStudent(student);
		}
	};

	return (
		<Form className="form-students" onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>First Name</Form.Label>
				<input
					type="text"
					id="add-user-name"
					placeholder="First Name"
					required
					value={student.firstname}
					onChange={handleNameChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Last Name</Form.Label>
				<input
					type="text"
					id="add-user-lastname"
					placeholder="Last Name"
					required
					value={student.lastname}
					onChange={handleLastnameChange}
				/>

				{/* parent, email student name, email ,  recieved */}
			</Form.Group>
			<Form.Group>
				<Form.Label>Student Id</Form.Label>
				<input
					type="text"
					id="add-student-id"
					placeholder="Student Id"
					value={student.studentid}
					onChange={handleStudentId}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Parent First Name</Form.Label>
				<input
					type="text"
					id="add-parent-first-name"
					placeholder="Parent First Name"
					required
					value={student.parentfirstname}
					onChange={handleParentFirstNameChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Parent Last Name</Form.Label>
				<input
					type="text"
					id="add-parent-last-name"
					placeholder="Parent Last Name"
					required
					value={student.parentlastname}
					onChange={handleParentLastNameChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Parent Email</Form.Label>
				<input
					type="text"
					id="add-parent-email"
					placeholder="Parent Email"
					required
					value={student.parentemail}
					onChange={handleParentEmailChange}
				/>
			</Form.Group>

			<Form.Check
				type={"checkbox"}
				id={`isCurrent`}
				checked={student.is_current}
				onChange={handleCheckChange}
				label={`Are they in the current program?`}
			/>
			<Form.Group>
				<Button type="submit" variant="outline-success">
					{student.id ? "Edit Student" : "Add Student"}
				</Button>
				{student.id ? (
					<Button type="button" variant="outline-warning" onClick={clearForm}>
						Cancel
					</Button>
				) : null}
			</Form.Group>
		</Form>
	);
};

export default MyForm;
