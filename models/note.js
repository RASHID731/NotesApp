const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: 'Class'
	}
});

module.exports = mongoose.model('Note', NoteSchema);
