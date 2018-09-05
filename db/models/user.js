const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: "First Name Required"
	},
	lastName: {
		type: String,
		trim: true,
		required: "Last Name Required"
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: "Email Required"
	},
	password: {
		type: String,
		trim: true,
		required: "Password Required"
	},
	handicap: {
		type: Number
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
