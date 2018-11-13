/**
Scores Schema-
	Date:
	Tees: {
		Rating:
		Slope:
	}
	Gross:
	Handicap Index at time:
	Course Handicap:
	Net:
**/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: "User Required"
	},
	date: {
		type: Date,
		required: "Date Required"
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		required: "Course Required"
	},
	grossScore: {
		type: Number,
		required: "Gross Score Required"
	},
	courseHandicap: {
		type: Number
	},
	netScore: {
		type: Number
	},
	differential: {
		type: Number
	}
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
