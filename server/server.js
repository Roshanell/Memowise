const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const { Configuration, OpenAIApi } = require("openai");
const data = require("./mockFlashCardData.json");
const imagesData = require("./mockPixabayImages.json");
//const API_KEY = process.env.API_KEY;

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
	organization: "org-J9MVBvQcfVGNwJp9ChXmJ0Fu",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// org - J9MVBvQcfVGNwJp9ChXmJ0Fu;
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

//open ai req
app.get("/api/openai", async (req, res) => {
	console.log("connected to open ai on server.js");
	try {
		// using mock data for now
		res.json(data);
		//console.log(data);
		// const response = await openai.createCompletion({
		// 	model: "text-davinci-003",
		// 	prompt:
		// 		"Generate for me flash cards defining the elements of plot for fictional stories at a 5th grade level. Structure your response as a JSON array.  Each object in the array will have a key for the title of the card and the value will be the element you are defining. Each object also has a key for the content of the card and the value is the definition",
		// 	max_tokens: 500,
		// 	temperature: 1,
		// });
		// Response for data
		//console.log(response.data.choices[0].text);
		//console.log(JSON.parse(response.data.choices[0].text));
		// res.send(students);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

app.get("/api/pixabay", (req, res) => {
	res.json(imagesData);
	// const test = req.query;
	// // console.log(test, "hi");
	// const API_KEY = process.env.API_KEY;
	// console.log(API_KEY);

	// const url =
	// 	"https://pixabay.com/api/?key=" +
	// 	API_KEY +
	// 	"&q=" +
	// 	encodeURIComponent("red roses");
	// console.log(url);

	// fetch(url)
	// 	.then((response) => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			throw new Error("Network response was not ok");
	// 		}
	// 	})
	// 	.then((data) => {
	// 		// define an empty arr called hits
	// 		let hits = [];
	// 		// if total its is more than 0
	// 		if (parseInt(data.totalHits) > 0) {
	// 			// map over each hit
	// 			data.hits.forEach((hit) => {
	// 				// define a single hit
	// 				const singleHit = hit.pageURL;
	// 				// push single shit in hits arr
	// 				hits.push(singleHit);
	// 				console.log(hit.pageURL);
	// 			});
	// 			// send hits to front end
	// 			res.send(hits);
	// 		} else {
	// 			console.log("No hits");
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.error("There was a problem with the fetch operation:", error);
	// 	});
});

app.get("/api/mw", (req, res) => {
	const mw_api_key = process.env.MW_API_KEY;
	let query = "home";
	// let query = input.target.value;
	const url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${query}}?key=${mw_api_key}`;
	console.log(url);
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			//console.log(data);
			res.send({ data });
		})
		.catch((err) => {
			console.log(err);
		});
	try {
	} catch (e) {
		return res.status(400).json({ e });
	}
});

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
