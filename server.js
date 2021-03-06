const assert = require("assert");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/", express.static(path.resolve(__dirname, "./build")));

const routes = require("./routes/routes.js");
app.use("/", routes);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

// Connection URL
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/handycapped";

// Use connect method to connect to the server
mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	app.listen(PORT, function() {
		console.log("Listening on port %s", PORT);
	});
});
