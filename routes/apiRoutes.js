var bcrypt = require('bcrypt');
var db = require('../db/models');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const saltRounds = 10;
const jwtKey = "SuperSecretKey";

router.post('/login', (req, res) => {
	db.user.findOne({
		where: {
			username: req.body.username
		}
	}).then( result => {
		if(result){
			const user = result.dataValues;
			console.log(user);
			bcrypt.compare(req.body.password, result.dataValues.password, (err, compared) => {
				if (compared) {
					jwt.sign({ user: user.username }, jwtKey, {expiresIn: '45s'}, (err, token) => {
						res.json({
							message: "Matched hash...logging in",
							token: token,
							user: user.username
						});
					});
				} else {
					res.json({
						message: "Password did not match"
					})
				}
			})
		}
		else {
			res.json({
				message: "User not found"
			});
		}
	})
})

router.post('/register', (req,res)=>{
	//Check user database for unique ID and create entry if valid
	db.user.findOne({
		where: {
			username: req.body.username
		}
	}).then( result => {
		if (!result){
			//Hash Password with Bcrypt here
			bcrypt.genSalt(saltRounds, (err, salt) => {
    			bcrypt.hash(req.body.password, salt, (err, hash) => {
        		// Store hash in your password DB.
        			db.user.create({
						username: req.body.username,
						password: hash
					});
					res.json({
						message: "New User Registered"
					});
    			});
			});			
		} else {
			res.json({
				message: "User already exists"
			});
		}
	})
});

router.post('/verify', (req, res) => {
	jwt.verify(req.body.token, jwtKey, (err, decoded)=> {
		if (decoded) {
			res.json({
				decoded: decoded
			});
		} else {
			res.json({
				message: "invalid token"
			})
		}
	})
})

module.exports = router;