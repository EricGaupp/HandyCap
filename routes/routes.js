const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../db/models/user");
const Course = require("../db/models/course");
const Score = require("../db/models/score");

const router = express.Router();

const saltRounds = 10;
const jwtKey = process.env.JWT_KEY;

router.post("/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, userResult) => {
		if (err) throw err;
		if (userResult) {
			//If user found compare hash
			bcrypt.compare(
				req.body.password,
				userResult.password,
				(err, compared) => {
					//Consider grabbing scores here
					//If hash matches sign and return JWT with user's mongo ObjectId and firstName as payload
					if (compared) {
						jwt.sign(
							{
								userID: userResult._id,
								firstName: userResult.firstName
							},
							jwtKey,
							{ expiresIn: "1h" },
							(err, token) => {
								if (err) throw err;
								res.json({
									message: "Matched hash...logging in",
									token: token,
									user: {
										userID: userResult._id,
										firstName: userResult.firstName
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
					// Store hash in database then sign and return JWT with user's mongo ObjectId and firstName
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
									firstName: registeredUser.firstName
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

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const token = bearer[1];
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) {
				res.sendStatus(403);
			} else {
				req.body.userID = decoded.userID;
				next();
			}
		});
	} else {
		res.sendStatus(403);
	}
}

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

const protectedRoutes = require("./protectedRoutes");
router.use("/api", verifyToken, protectedRoutes);

module.exports = router;
