const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teeSchema = new Schema({
	courseId: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		required: "Course Required"
	},
	color: {
		type: String,
		trim: true,
		required: true
	},
	rating: {
		type: Number,
		required: "Course Rating Required"
	},
	slope: {
		type: Number,
		required: "Slope Required"
	}
});

const Tee = mongoose.model("Tee", teeSchema);

module.exports = Tee;
