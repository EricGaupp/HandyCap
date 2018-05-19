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
			email: req.body.email
		}
	}).then( result => {
		if(result){
			bcrypt.compare(req.body.password, result.dataValues.password, (err, compared) => {
				if (compared) {
					jwt.sign({
						userID: result.dataValues.id, 
						firstName: result.dataValues.firstName, 
						lastName: result.dataValues.lastName 
					}, jwtKey, {expiresIn: '1h'}, (err, token) => {
						res.json({
							message: "Matched hash...logging in",
							token: token,
							user: {
								id: result.dataValues.id,
								firstName: result.dataValues.firstName,
								lastName: result.dataValues.lastName
							}
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
			email: req.body.email
		}
	}).then( result => {
		if (!result){
			//Hash Password with Bcrypt here
			bcrypt.genSalt(saltRounds, (err, salt) => {
    			bcrypt.hash(req.body.password, salt, (err, hash) => {
        		// Store hash in your password DB.
        			db.user.create({
						email: req.body.email,
						password: hash,
						firstName: req.body.firstName,
						lastName: req.body.lastName
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
			});
		}
	})
})

module.exports = router;