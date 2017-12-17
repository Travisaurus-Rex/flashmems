var express  = require('express');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var User     = require('../models/user');
var FlashCard = require('../models/flashcard');
var db       = require('../db/db');
var router   = express.Router();

mongoose.connect(db).then(() => {

	router.post('/signup', (req, res) => {
		
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

	router.post('/login', (req, res) => {

		let { username, password } = req.body;

		// get the user from the database
		User.findOne({ username: username }, (err, user) => {

			if (err) res.throw(new Error());

			 // user exists
			if (user) {

				// compare password with hash from the database
				let passTest = passwordHash.verify(password, user.password);

				// password is valid
				if (passTest) {

					res.json({status: 'Valid'});
					
				// password is invalid
				} else {

					res.json({
						status: 'Invalid', 
						message: 'Invalid Password'
					});

				}
			// user was not found in the db
			} else {

				res.json({
					status: 'Invalid', 
					message: 'Username not found'
				});
			
			}

		})
	})

	router.post('/flashcard', (req, res, next) => {
		let { front, back } = req.body;

		if (front && back) {
			let newFlashCard = new FlashCard({
				front: front,
				back: back
			})

			newFlashCard.save(err => {
				if (err) {
					res.status(500).json({ message: 'Database error.' });
				} else {
					//res.status(500).json({ message:'Something went wrong.' });
					res.json({status: 200, message: 'Flashcard saved successfully!'})
				}
			})

		} else {
			res.status(500).json({ message:'Something went wrong.' });
		}
	})
})

module.exports = router;
