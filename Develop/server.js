const fs = require('fs');
const path = require('path');
const express = require('express');
const dbInfo = require('./db/db.json');
var uuidv1 = require('uuidv1');

// Port and express setup 
const PORT = process.env.PORT || 3001;
const app = express();

// Parse data from string, array, and JSON file
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET /notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET data from db file to append 
app.get('/api/notes', (req, res) => {
  const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
  const parseNotes = JSON.parse(dataNotes);
  res.json(parseNotes);
});

// POST note to db and append to page
app.post('/api/notes', (req, res) => {
  const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
  const parseNotes = JSON.parse(dataNotes);
  req.body.id = uuidv1()
  parseNotes.push(req.body);

  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
  res.json("Your note has been added.");
});

// GET the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Attempting delete route
app.delete('api/notes/:id', (req, res) => {
  console.log(uuidv1());
  console.log(req.params.id);
  let noteDelete = parseInt(req.params.id);
  console.log(noteDelete);

  for (let i = 0; i < dbInfo.length; i++) {
    if (noteDelete === dbInfo[i].id) {
      dbInfo.parseInt(i, 1);

    let jsonNote = JSON.splice(dbInfo, null, 1);
    console.log(jsonNote);
    fs.writeFile('./db/db.json', jsonNote, (err) => {
      if (err) throw err;
      console.log('Your note has been deleted.');
      res.json(dbInfo);
    });

    }

  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});