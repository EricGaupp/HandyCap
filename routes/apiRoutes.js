const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const router = express.Router();

const saltRounds = 10;
const jwtKey = "SuperSecretKey";

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
							res.json({
								userID: registeredUser._id,
								firstName: registeredUser.firstName
							});
						}
					);
				});
			});
		} else {
			res.status(409).send("User already exists");
		}
	});
});

router.post("/verify", (req, res) => {
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

module.exports = router;
