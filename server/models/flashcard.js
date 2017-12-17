let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let FlashCardSchema = new Schema({
	front: String,
	back: String
})

module.exports = mongoose.model('FlashCard', FlashCardSchema);