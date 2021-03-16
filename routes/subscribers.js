const express = require('express');
const Subscriber = require('../models/subscriber');

const router = express.Router();

// Get many
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Create one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.put('/:id', getSubscriber, async (req, res) => {
  try {
    await Subscriber.updateOne({ _id: res.subscriber.id }, req.body);
    res.json({ message: 'Subscriber updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await Subscriber.deleteOne({ _id: res.subscriber.id });
    res.json({ message: 'Subscriber deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper middleware
async function getSubscriber(req, res, next) {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: 'Subscriber not found' });
    } else {
      res.subscriber = subscriber;
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
