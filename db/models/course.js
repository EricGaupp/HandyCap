const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
	courseName: {
		type: String,
		trim: true,
		unique: true,
		required: "Course Name Required"
	},
	city: {
		type: String,
		trim: true,
		required: "Course City Required"
	},
	state: {
		type: String,
		trim: true,
		required: "Course State Required"
	}
	//Need Par?
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
