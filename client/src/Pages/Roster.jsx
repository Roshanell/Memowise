import React from "react";
import ListStudents from "../components/ListStudents";

import Instructions from "../components/Instructions";
import { useAuth0 } from "@auth0/auth0-react";
import NavBanner from "../components/NavBanner";

const Roster = () => {
	const { user } = useAuth0();
	// console.log(user);

	const personalizedInstructions =
		user && user.given_name
			? `Hello ${user.given_name}! To add a Student: Click "Add Student," fill in details, and save. To Edit a Student: Click "Edit" next to the student, make changes, and save. To Delete a Student: Click "Delete" next to the student to remove them permanently.`
			: "Instructions for adding, editing, and deleting students.";
	return (
		<div>
			<NavBanner />
			<Instructions personalizedInstructions={personalizedInstructions} />
			<ListStudents />

		</div>
	);
};

export default Roster;
