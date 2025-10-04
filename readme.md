# Nootes App

## What It Does
This Express and EJS to-do manager lets you group notes into color-coded classes, create new tasks in context, and keep the workspace tidy by removing notes or entire classes in one click. Notes inherit their class color for quick scanning, and the interface exposes pop-up forms to add content without navigating away from the board.

## Tech Stack
- Backend: Node.js with Express
- Frontend: EJS templates rendered with ejs-mate, vanilla JavaScript, Sass-authored styles compiled to CSS
- Data: MongoDB persisted through Mongoose models with seeded class/category data
- Deployment: Render

## Architecture
- **Server (`app.js`)**: Express application bootstrapped with EJS rendering, static asset serving, and REST-style routes for notes and classes. Uses Mongoose models to persist data and links notes to their owning class.
- **Views (`views/`)**: EJS templates backed by a shared layout. The `notes/index.ejs` template renders the class sidebar, note list, and modal-style forms.
- **Persistence**: MongoDB database storing `Class` and `Note` documents. A post-delete hook on `Class` cascades removals to any notes in the class.

## Functional Coverage
- **Notes**
  - Create a note with text and attach it to an existing class through the add-note dialog.
  - Render note cards with the class color on the left edge for easy visual grouping.
  - Remove a note directly from the board; the server deletes the document from MongoDB.
- **Classes**
  - Define a class name and pick a hex color; uniqueness is enforced at the database level.
  - Delete a class and automatically cascade the removal to all of its notes.
- **Interface**
  - Landing page redirects to `/notes`, rendering the complete workspace in a single view.
  - Pop-up forms use anchor navigation so users can add notes or classes without leaving the list.
  - Inline checkboxes support marking a note as completed on the client side without mutating the database.

## API Endpoints
- `GET /` — redirect to the notes dashboard.
- `GET /notes` — list every class and note, populating class references for display.
- `POST /notes` — create a new note and associate it with the selected class.
- `DELETE /notes/:id` — remove a note by identifier.
- `POST /classes` — add a new class with a unique name and color.
- `DELETE /classes/:id` — delete a class and cascade-delete its notes via a Mongoose hook.

## Directory Layout
```
.
├── app.js
├── models/
│   ├── class.js
│   └── note.js
├── public/
│   └── ... static assets (CSS, fonts, icons)
├── seeds/
│   ├── index.js
│   └── notes.js
├── views/
│   ├── layouts/
│   └── notes/
├── package.json
└── readme.md
```

## Minimal Setup
1. Install dependencies with `npm install`.
2. (Optional) Seed starter classes by running `node seeds/index.js` with MongoDB running locally.
3. Launch the app with `npm start` and visit `http://localhost:3000/notes`.
