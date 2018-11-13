/**
Course: {
	Name: ,
	Location: ,
	Tees: {
		//Mongoose Map function to create and save different tees??? .get .set methods to save and read
		Color: ,
		Holes: [{
			//Map function again for par, yardages and to control for number of holes???
			1: {
				Par: ,
				Yardage:
			}
		}]	
	}
}
**/

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
	},
	tees: [
		{
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
		}
	]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
