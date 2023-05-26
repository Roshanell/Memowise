const { Pool } = require("pg");

let db;

if (process.env.NODE_ENV === 'production') {
	// Use connection details for GCP
	db = new Pool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
	});
} else {
	db = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
}

module.exports = db;
