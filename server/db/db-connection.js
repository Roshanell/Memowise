const { Pool } = require("pg");
const db = new Pool({
	connectionString: "postgresql://localhost/classbuddy",
});

module.exports = db;
