const mongoose = require('mongoose');
const Note = require('./note');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	color: {
		type: String,
		required: true,
		unique: true
	},
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Note'
		}
	]
});

ClassSchema.post('findOneAndDelete', async function(theClass) {
	if (theClass.notes.length) {
		await Note.deleteMany({ _id: { $in: theClass.notes } });
	}
});

module.exports = mongoose.model('Class', ClassSchema);
