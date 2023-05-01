const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
	res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for students in the endpoint '/api/students'
app.get("/api/students", async (req, res) => {
	try {
		const { rows: students } = await db.query("SELECT * FROM students");
		res.send(students);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

// app.get("/api/image/", (req, res) => {
// 	// const test = req.query;
// 	// console.log(test);

// 	var URL =
// 		"https://pixabay.com/api/?key=" +
// 		API_KEY +
// 		"&q=" +
// 		encodeURIComponent("red roses");
// 	$.getJSON(URL, function (data) {
// 		if (parseInt(data.totalHits) > 0)
// 			$.each(data.hits, function (i, hit) {
// 				console.log(hit.pageURL);
// 			});
// 		else console.log("No hits");
// 	});

// 	//const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
// 	console.log(URL);
// 	fetch(URL)
// 		.then((res) => res.json())
// 		.then((data) => {
// 			//console.log(data);
// 			res.send({ data });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

// create the POST request
app.post("/api/students", async (req, res) => {
	try {
		const newStudent = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			iscurrent: req.body.iscurrent,
			parentfirstname: req.body.parentfirstname,
			parentlastname: req.body.parentlastname,
			parentemail: req.body.parentemail,
		};
		//console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
		const result = await db.query(
			"INSERT INTO students(firstname, lastname, is_current, parentfirstname, parentlastname, parentemail) VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *",
			[
				newStudent.firstname,
				newStudent.lastname,
				newStudent.iscurrent,
				newStudent.parentfirstname,
				newStudent.parentlastname,
				newStudent.parentemail,
			]
		);
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

// delete request for students
app.delete("/api/students/:studentId", async (req, res) => {
	try {
		const studentId = req.params.studentId;
		await db.query("DELETE FROM students WHERE id=$1", [studentId]);
		console.log("From the delete request-url", studentId);
		res.status(200).end();
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

//A put request - Update a student
app.put("/api/students/:studentId", async (req, res) => {
	//console.log(req.params);
	//This will be the id that I want to find in the DB - the student to be updated
	const studentId = req.params.studentId;
	const updatedStudent = {
		id: req.body.id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		iscurrent: req.body.is_current,
		parentfirstname: req.body.parentfirstname,
		parentlastname: req.body.parentlastname,
		parentemail: req.body.parentemail,
	};
	console.log("In the server from the url - the student id", studentId);
	console.log(
		"In the server, from the react - the student to be edited",
		updatedStudent
	);
	// UPDATE students SET lastname = "something" WHERE id="16";
	const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 parentfirstname=$4, parentlastname=$5, parentemail=$6 WHERE id=${studentId} RETURNING *`;
	const values = [
		updatedStudent.firstname,
		updatedStudent.lastname,
		updatedStudent.iscurrent,
		updatedStudent.parentfirstname,
		updatedStudent.parentlastname,
		updatedStudent.parentemail,
	];
	try {
		const updated = await db.query(query, values);
		console.log(updated.rows[0]);
		res.send(updated.rows[0]);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

// console.log that your server is up and running
app.listen(PORT, () => {
	console.log(`Hola, Server listening on ${PORT}`);
});
