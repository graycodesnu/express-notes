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

// Call the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});






app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});