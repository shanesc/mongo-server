const express = require('express');
const app = express();
const mongoose = require('mongoose');

// SETUP DATABASE
mongoose.connect('mongodb://localhost/subscribers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// MIDDLEWARE

// START SERVER
app.listen(3000, () => console.log('Server started'));
