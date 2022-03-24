const mongoose = require('mongoose');
const { nClasses } = require('./notes');
const Note = require('../models/note');
const Class = require('../models/class');

mongoose.connect('mongodb://localhost:27017/nootesApp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Datebase connected');
});

const seedDB = async () => {
	// await Note.deleteMany({});
	await Class.deleteMany({});

	//  SEED NOTES
	// for (let note of notes) {
	// 	const newNote = new Note(note);
	// 	await note.save().then((data) => {
	// 		console.log('New Note!');
	// 		console.log(data);
	// 	});
	// }

	//  SEED CLASSES
	for (let nClass of nClasses) {
		await new Class(nClass).save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
