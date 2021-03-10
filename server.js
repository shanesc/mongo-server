require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

/* Using Babel, we can instead use ES6 import/export syntax, e.g. */
// import express from 'express';

const port = process.env.PORT || 3000;

// SETUP DATABASE
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// MIDDLEWARE
app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

// START SERVER
app.listen(port, () => console.log(`Server started on port ${port}`));
