const express = require("express");

const User = require("../db/models/user");
const Course = require("../db/models/course");
const Score = require("../db/models/score");

const router = express.Router();

router.post("/addScore", (req, res) => {
	const {
		userID,
		course,
		date,
		grossScore,
		courseHandicap,
		netScore
	} = req.body;
	Score.create(
		{
			date: date,
			grossScore: grossScore,
			courseHandicap: courseHandicap,
			netScore: netScore,
			course: course,
			user: userID
		},
		(err, addedScore) => {
			if (err) throw err;
			res.json(addedScore);
		}
	);
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
