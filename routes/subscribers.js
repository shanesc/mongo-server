const express = require('express');
const router = express.Router();

// Get many
router.get('/', (req, res) => {
  res.send('Hello World');
});
// Get one
router.get('/', (req, res) => {});
// Create one
router.post('/', (req, res) => {});
// Update one
router.put('/', (req, res) => {});

module.exports = router;
