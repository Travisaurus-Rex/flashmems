var express  = require('express');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var User     = require('../models/user');
var db       = require('../db/db');
var router   = express.Router();

mongoose.connect(db).then(() => {

	router.post('/signup', (req, res, next) => {
		
		let { username, password } = req.body;

		let hash = passwordHash.generate(password);

		let newUser = new User({ 
			username: username, 
			password: hash
		});

		newUser.save(err => {
			if (err) {
				res.throw(new Error())
			} else {
				res.send({status: 'User created'})
			}
		})

	})

	router.post('/login', (req, res, next) => {

		let { username, password } = req.body;

		// get the user from the database
		User.findOne({ username: username }, (err, user) => {

			if (err) res.throw(new Error());

			if (user) {

				// compare password with hash from the database
				let passTest = passwordHash.verify(password, user.password);
				
				if (passTest) {

					res.json({status: 'Valid'});

				} else {

					res.json({
						status: 'Invalid', 
						message: 'Invalid Password'
					});

				}

			} else {

				res.json({
					status: 'Invalid', 
					message: 'Username not found'
				});
			
			}

		})
	})
})

module.exports = router;
