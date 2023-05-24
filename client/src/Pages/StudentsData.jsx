import React from 'react'
import Instructions from '../components/Instructions'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function StudentsData() {
    	const personalizedInstructions = `Select a student's name to see thier data`;
  return (
		<div>
			<Instructions personalizedInstructions={personalizedInstructions} />{" "}
			<DropdownButton id="dropdown-basic-button" title="Dropdown button">
				<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
				<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
				<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
			</DropdownButton>
		</div>
	);
}

export default StudentsData