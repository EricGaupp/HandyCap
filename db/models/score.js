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
	date: {
		type: Date,
		required: true
	}
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
	course: {
		type: Schema.Types.ObjectId,
		ref: "Course"
	},
	tees: {
		type: Schema.Types.ObjectId,
		ref: "Tees"
	}
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
