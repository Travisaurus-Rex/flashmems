let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let UserSchema = new Schema({
	username: String,
	password: String,
	created: {
		type: Date,
		date: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);