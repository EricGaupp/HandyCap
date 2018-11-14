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
	courseId: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		required: "Course Required"
	},
	teesId: {
		type: Schema.Types.ObjectId,
		ref: "Tee",
		required: "Tees Required"
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
