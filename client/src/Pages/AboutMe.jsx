
import Accordion from 'react-bootstrap/Accordion';
import React from "react";

const AboutMe = () => {
	return (
		<div className='about-me-body'>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Accordion Item #1</Accordion.Header>
					<Accordion.Body>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Accordion Item #2</Accordion.Header>
					<Accordion.Body>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<h1>Welcome to my website!</h1>
			<p>
				My name is Roshanell, and I'm an inspiring educator-turned-software
				engineer with a passion for leveraging technology to enhance education.
				I bring a unique blend of skills and experiences to the tech industry,
				combining my deep understanding of educational practices with my coding
				abilities. My journey into the world of technology began during the
				pandemic and continues with my time at Techtonica, a bootcamp dedicated
				to nurturing diversity in tech. It was there that I further honed my
				coding skills and had the opportunity to work on various projects,
				including this innovative AI-powered application that aimed to
				revolutionize educational practices. This experience ignited my passion
				for software development and its potential to create positive change in
				the field of education. In addition to my technical skills, I also have
				a background in technical writing. Throughout my career, I have always
				been drawn to writing and creating effective documentation.. I believe
				that clear and concise documentation plays a crucial role in the success
				of any software development endeavor. With my passion for writing and
				technical documentation, I strive to ensure that my projects are
				well-documented, making them easily understandable for both technical
				and non-technical audiences.
			</p>
		</div>
	);
};

export default AboutMe;






