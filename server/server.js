const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const { Configuration, OpenAIApi } = require("openai");
const data = require("./mockFlashCardData.json");
// const imagesData = require("./mockPixabayImages.json");
const dictionaryData = require("./mockDictonaryData.json");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
	organization: process.env.ORGANIZATION,
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
	res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for students in the endpoint '/api/students'
app.get("/api/students", async (req, res) => {
	try {
		const { rows: students } = await db.query("SELECT * FROM students");
		// console.log(students);
		res.send(students);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

//open ai post req
app.post("/api/cards-generate", async (req, res) => {
	// console.log("connected to open ai on server.js");
	try {
		// using mock data for now
		// res.json(data);
		// console.log(data);
		// variables that are in the req body should be referenced from here
		let { numberOfCards, cardTopic, gradeLevel } = req.body;
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Generate for me ${numberOfCards} flash cards at a grade ${gradeLevel} level. The topic of the flash cards will be ${cardTopic}. Structure your response as a JSON array.  Each object in the array is a flash card. Each card has a card title, correct answer, and 2 wrong answers. Insert a hint that wouldbe helpful if either of the wrong answers were selected. The tag should be one word that sums up the topic of all currently generated cards. This would be an example of an returned card object {
				"concept": "",
				"answer": "",
				"wronganswerone": "",
				"hintOne": "",				
				"wronganswertwo": "",
				"hintTwo": "",
				"tag": ""

			}`,
			max_tokens: 2048,
			temperature: 1,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		});
		//Response for data
		// console.log(response.data.choices[0].text);
		// console.log(JSON.parse(response.data.choices[0].text));
		// console.log(response);

		res.send(response.data.choices[0].text);
	} catch (e) {
		// console.log(e);
		return res.status(400).json({ e });
	}
});

app.get("/api/pixabay", (req, res) => {
	// res.json(imagesData);
	// const test = req.query.
	// console.log(test, "hi");
	const API_KEY = process.env.API_KEY;
	// console.log(API_KEY, "api key");
	// console.log(req, "req");
	// console.log(req.query, "server line 74");
	// change this so code is dynamic
	let query = encodeURI(req.query.query, "query");

	const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`;
	// console.log(url, "url");
	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Network response was not ok");
			}
		})
		.then((data) => {
			// define an empty arr called hits
			let hits = [];
			// if total its is more than 0
			if (parseInt(data.totalHits) > 0) {
				// map over each hit
				data.hits.forEach((hit) => {
					// define a single hit
					const singleHit = hit.webformatURL;
					// push single shit in hits arr
					hits.push(singleHit);
					// console.log(hit.webformatURL);
				});
				// send hits to front end
				res.send(hits);
			} else {
				// console.log("No hits");
			}
		})
		.catch((error) => {
			console.error("There was a problem with the fetch operation:", error);
		});
});

app.get("/api/mw", (req, res) => {
	// res.json(dictionaryData);
	const mw_api_key = process.env.MW_API_KEY;
	// let query = "home";
	let query = req.query.query;
	// console.log(query, "query");
	const url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${query}}?key=${mw_api_key}`;
	// console.log(url);
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			//console.log(data);
			res.send({ data });
		})
		.catch((err) => {
			// console.log(err);
		});
	try {
	} catch (e) {
		return res.status(400).json({ e });
	}
});

app.get("/api/cards/:id", async (req, res) => {
	// console.log(req.params.id);
	try {
		const { rows: cards } = await db.query(
			"SELECT * FROM cards WHERE user_id = $1",
			[req.params.id]
		);
		// console.log(cards);
		res.send(cards);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

app.get("/api/cards", async (req, res) => {
	try {
		const { rows: cards } = await db.query("SELECT * FROM cards");
		// console.log(cards);
		res.send(cards);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

app.get("/api/scores/:sub", async (req, res) => {
	try {
		const { sub } = req.params;
		const result = await db.query(
			"SELECT cardid, SUM(CASE WHEN iscorrect THEN 1 ELSE 0 END) AS correct_count, SUM(CASE WHEN iscorrect  THEN 0 ELSE 1 END) AS incorrect_count FROM stats WHERE userid = $1 GROUP BY cardid",
			[sub]
		);

		// console.log(result);
		res.json(result.rows);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

// creates new entry for user, else does nothing
app.post("/api/user", cors(), async (req, res) => {
	// console.log(
	// 	"id and email",req.body.id, req.body.email);
	try {
		const newUser = {
			id: req.body.id,
			email: req.body.email,
		};
		const result = await db.query(
			"INSERT INTO users(id, email) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING*",
			[newUser.id, newUser.email]
		);
		// console.log("result.rows[0]: ", result.rows[0]);
		// if value is undefined, set value to {}
		res.json(result.rows[0] ?? {});
	} catch (e) {
		// console.log(e);
		return res.status(400).json({ e });
	}
});

// This is an HTTP POST endpoint to create a student resource
app.post("/api/students", async (req, res) => {
	try {
		// Create a new student object using request body fields
		const newStudent = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			iscurrent: req.body.iscurrent,
			parentfirstname: req.body.parentfirstname,
			parentlastname: req.body.parentlastname,
			parentemail: req.body.parentemail,
			studentid: req.body.studentid || null, // Set student ID to null if it does not exist in the request
		};

		// Check if the student ID exists in the users table
		if (newStudent.studentid) {
			const userExists = await db.query("SELECT * FROM users WHERE id = $1", [
				newStudent.studentid,
			]);

			// If no user is found, remove the invalid student ID from the new student object
			if (userExists.rows.length === 0) {
				console.log("Invalid student ID: " + newStudent.studentid);
				delete newStudent.studentid;
			}
		}

		// Insert the new student into the students table and return the newly created resource
		const result = await db.query(
			"INSERT INTO students(firstname, lastname, is_current, parentfirstname, parentlastname, parentemail, studentid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
			[
				newStudent.firstname,
				newStudent.lastname,
				newStudent.iscurrent,
				newStudent.parentfirstname,
				newStudent.parentlastname,
				newStudent.parentemail,
				newStudent.studentid,
			]
		);

		res.json(result.rows[0]); // Respond with the newly created resource
	} catch (e) {
		return res.status(400).json({ error: e.message }); // Respond with an error message if there was any error during the process
	}
});

app.post("/api/cards/:userid", async (req, res) => {
	try {
		// console.log("request body", req.body);
		const newCards = req.body;
		// console.log("new cards", newCards);
		await newCards.forEach(async (newCard) => {
			await db.query(
				"INSERT INTO cards(concept, answer, imagelink, audiolink, wronganswerone, wronganswertwo, tag, user_id,hint_one, hint_two ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
				[
					newCard.concept,
					newCard.answer,
					newCard.imagelink,
					newCard.audiolink,
					newCard.wronganswerone,
					newCard.wronganswertwo,
					newCard.tag,
					req.params.userid,
					newCard.hintOne,
					newCard.hintTwo,
				]
			);
		});

		res.json("sucess");
		// console.log("result", result);

		//
		// console.log("req.body", req.body);
		// console.log(result.rows[0]);
	} catch (e) {
		// console.log(e);
		return res.status(400).json({ e });
	}
});

// /// API endpoint for inserting correct answer

app.post("/api/stats/correct/:sub", async (req, res) => {
	try {
		const { sub } = req.params; // gets the userId from the URL route parameters
		const { cardId } = req.body; // gets the cardId from the request body
		const query =
			"INSERT INTO stats (userId, cardId, isCorrect) VALUES ($1, $2, $3)"; // SQL query to insert data into the stats table
		const values = [sub, cardId, true]; // Values that'll be inserted into the query
		await db.query(query, values); // do the query with the values
		res.sendStatus(200);
	} catch (error) {
		console.error("Error inserting correct answer:", error);
		res.sendStatus(500); // Send an error response
	}
});

// // API endpoint for inserting incorrect answer
app.post("/api/stats/incorrect/:sub", async (req, res) => {
	try {
		const { sub } = req.params; // get the userId from the URL route parameters
		const { cardId } = req.body; // get the cardId from the request body
		const query =
			"INSERT INTO stats (userId, cardId, isCorrect) VALUES ($1, $2, $3)"; // SQL query to insert data into the stats table
		const values = [sub, cardId, false]; // Values to be inserted into the query
		await db.query(query, values); // get the query with the values
		res.sendStatus(200);
	} catch (error) {
		console.error("Error inserting incorrect answer:", error);
		res.sendStatus(500);
	}
});

// app.post("/api/answer/:userid", async (req, res) => {
// 	try {
// 		if (req.body.answer === "correct") {
// 			await db.query(
// 				"UPDATE stats SET correct = correct + 1 WHERE userid = $1",
// 				[req.params.userid]
// 			);
// 		}
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(400).json({ e });
// 	}
// });

// delete request for students
app.delete("/api/students/:studentId", async (req, res) => {
	try {
		const studentId = req.params.studentId;
		await db.query("DELETE FROM students WHERE id=$1", [studentId]);
		// console.log("From the delete request-url", studentId);
		res.status(200).end();
	} catch (e) {
		// console.log(e);
		return res.status(400).json({ e });
	}
});

// delete request for card
app.delete("/api/cards/:cardId", async (req, res) => {
	try {
		const cardId = req.params.cardId;
		await db.query("DELETE FROM cards WHERE id=$1", [cardId]);
		// console.log("From the delete request-url", cardId);
		res.status(200).end();
	} catch (e) {
		// console.log(e);
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
	// console.log("In the server from the url - the student id", studentId);
	// console.log(
	// 	"In the server, from the react - the student to be edited",
	// 	updatedStudent
	// );
	// UPDATE students SET lastname = "something" WHERE id="16";
	const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3, parentfirstname=$4, parentlastname=$5, parentemail=$6 WHERE id=${studentId} RETURNING *`;
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
		// console.log(updated.rows[0]);
		res.send(updated.rows[0]);
	} catch (e) {
		// console.log(e);
		return res.status(400).json({ e });
	}
});

// console.log that your server is up and running
app.listen(PORT, () => {
	console.log(`Hola, Server listening on ${PORT}`);
});
