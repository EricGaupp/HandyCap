var bcrypt = require('bcrypt');
var db = require('../db/models');
var express = require('express');
var router = express.Router();

router.post('/register', function(req,res){
	//Check user database for unique ID and create entry if valid
});

module.exports = router;