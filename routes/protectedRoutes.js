const express = require("express");

const Course = require("../db/models/course");
const Score = require("../db/models/score");

const router = express.Router();

router.post("/addScore", (req, res) => {
	let netScore = req.body.grossScore;
	let differential, courseRating, courseSlope;
	const {
		userID,
		date,
		courseId,
		teesId,
		grossScore,
		courseHandicap
	} = req.body;
	//Quick mafs for Net Score and Differential if course handicap defined
	if (courseHandicap !== "undefined") {
		netScore = grossScore - courseHandicap;
		differential = ((grossScore - courseRating) * 113) / courseSlope;
	}
	Score.create(
		{
			user: userID,
			date: date,
			courseId: courseId,
			teesId: teesId,
			grossScore: grossScore,
			courseHandicap: courseHandicap,
			netScore: netScore,
			differential: differential
		},
		(err, addedScore) => {
			if (err) throw err;
			res.json({ message: "Score Added", addedScore });
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
