const assert = require("assert");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.API_PORT || 8080;

app.use(bodyParser.json());

app.use("/", express.static(path.resolve(__dirname, "./build")));

const apiRoutes = require("./routes/apiRoutes.js");
app.use("/api", apiRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

// Connection URL
const url = process.env.DB_HOST || "mongodb://localhost:27017/handycapped";

// Use connect method to connect to the server
mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	app.listen(PORT, function() {
		console.log("Listening on port %s", PORT);
	});
});
