const express = require("express");

const mongoose = require("mongoose");

const Course = require("../db/models/course");
const Score = require("../db/models/score");
const Tee = require("../db/models/tee");

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
	//Quick mafs for Net Score and Differential if course handicap defined. Look into MongoDB triggers for updating userHandicap if changed
	if (courseHandicap !== "undefined") {
		netScore = grossScore - courseHandicap;
		differential = ((grossScore - courseRating) * 113) / courseSlope;
	}
	Score.create(
		{
			user: mongoose.Types.ObjectId(userID),
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
			//Logic to update users handicap
			res.json({ message: "Score Added", addedScore });
		}
	);
});

router.get("/getCourses", (req, res) => {
	//Populate Tees - do I need to add Tees ObjectId back to Course model? Tees should always correspond to a course, Course should always have a set of tees
	Course.find({})
		.sort("courseName")
		.exec((err, results) => {
			if (err) throw err;
			res.json(results);
		});
	//Alternatively do Tee.find({}).populate("courseId").exec(err,result => {res.json(results)}). Then on front end grab results.courseId and put in a sorted Set of courses
});

router.get("/getScores", (req, res) => {
	Score.find({ user: mongoose.Types.ObjectId(req.body.userID) })
		.populate("courseId")
		.populate("teesId")
		.exec((err, results) => {
			if (err) throw err;
			//Find a way to sort by 20 most recent
			res.json(results);
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
