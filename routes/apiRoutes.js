const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/models/user");
const Course = require("../db/models/course");

const router = express.Router();

const saltRounds = 10;
const jwtKey = process.env.JWT_KEY;

router.post("/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, result) => {
		if (err) throw err;
		if (result) {
			bcrypt.compare(
				req.body.password,
				result.password,
				(err, compared) => {
					if (compared) {
						jwt.sign(
							{
								userID: result._id,
								firstName: result.firstName,
								lastName: result.lastName
							},
							jwtKey,
							{ expiresIn: "1h" },
							(err, token) => {
								res.json({
									message: "Matched hash...logging in",
									token: token,
									user: {
										userID: result._id,
										firstName: result.firstName
									}
								});
							}
						);
					} else {
						res.json({
							message: "Password did not match"
						});
					}
				}
			);
		} else {
			res.json({
				message: "User not found"
			});
		}
	});
});

router.post("/register", (req, res) => {
	//Check user database for unique ID and create entry if valid
	User.findOne({ email: req.body.email }, (err, result) => {
		if (err) throw err;
		if (!result) {
			//Hash Password with Bcrypt here
			bcrypt.genSalt(saltRounds, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					// Store hash in your password DB.
					User.create(
						{
							email: req.body.email,
							password: hash,
							firstName: req.body.firstName,
							lastName: req.body.lastName
						},
						(err, registeredUser) => {
							if (err) throw err;
							jwt.sign(
								{
									userID: registeredUser._id,
									firstName: registeredUser.firstName,
									lastName: registeredUser.lastName
								},
								jwtKey,
								{ expiresIn: "1h" },
								(err, token) => {
									res.json({
										message: "New User Registered",
										token: token,
										user: {
											userID: registeredUser._id,
											firstName: registeredUser.firstName
										}
									});
								}
							);
						}
					);
				});
			});
		} else {
			res.status(409).send("User already exists");
		}
	});
});

router.post("/verifyStoredToken", (req, res) => {
	jwt.verify(req.body.token, jwtKey, (err, decoded) => {
		if (decoded) {
			res.json({
				decoded: decoded
			});
		} else {
			res.json({
				message: "invalid token"
			});
		}
	});
});

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const token = bearer[1];
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) {
				res.sendStatus(403);
			} else {
				next();
			}
		});
	} else {
		res.sendStatus(403);
	}
}

router.post("/addScore", verifyToken, (req, res) => {
	//Logic to add to database
	res.json({
		message: "Score Added"
	});
});

router.post("/addCourse", (req, res) => {
	Course.findOne({ courseName: req.body.course }, (err, result) => {
		if (err) throw err;
		if (!result) {
			Course.create(
				{
					courseName: req.body.courseName,
					city: req.body.city,
					state: req.body.state,
					tees: req.body.tees
				},
				(err, addedCourse) => {
					if (err) throw err;
					res.json({
						message: "Course Added to DB"
					});
				}
			);
		} else {
			res.json({ message: "Course already exists in DB" });
		}
	});
});

module.exports = router;
