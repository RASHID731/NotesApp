if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const Note = require('./models/note');
const Class = require('./models/class');

const dbUrl = process.env.DB_URL;
// mongodb://localhost:27017/nootesApp
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Datebase connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.redirect('/notes');
});

app.get('/notes', async (req, res) => {
	// const notes = await Note.find({});
	const classes = await Class.find({});
	const notes = await Note.find({}).populate('class');
	res.render('notes/index', { classes, notes });
});

app.post('/classes', async (req, res) => {
	const theClass = new Class(req.body);
	await theClass.save();
	res.redirect('/notes');
});

app.delete('/classes/:id', async (req, res) => {
	const { id } = req.params;
	await Class.findByIdAndDelete(id);
	res.redirect('/notes');
});

app.post('/notes', async (req, res) => {
	const { text, classId } = req.body;
	const theClass = await Class.findById(classId);
	const note = new Note({ text });
	theClass.notes.push(note);
	note.class = theClass;
	await note.save();
	await theClass.save();
	console.log(theClass);
	res.redirect('/notes');
});

app.delete('/notes/:id', async (req, res) => {
	const { id } = req.params;
	await Note.findByIdAndDelete(id);
	res.redirect('/notes');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App Is Listening To Port ${port}`);
});
