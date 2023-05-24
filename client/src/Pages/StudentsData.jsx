import React from 'react'
import Instructions from '../components/Instructions'

function StudentsData() {
    	const personalizedInstructions = `Select a student's name to see thier data`;
  return (
		<div>
			<Instructions personalizedInstructions={personalizedInstructions} />{" "}
		</div>
	);
}

export default StudentsData