const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Create a new player
router.post('/', async (req, res) => {
  try {
    const player = new Player({
      ...req.body,
      userId: req.body.userId || 'anonymous'
    });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find()
      .populate('userId', 'name');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific player
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate('userId', 'name');
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update player information
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'position', 'isRegistered'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    updates.forEach(update => player[update] = req.body[update]);
    await player.save();
    
    res.json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update player game statistics
router.patch('/:id/stats', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['goals', 'assists', 'yellowCards', 'redCards'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    if (!player.gameStats) {
      player.gameStats = {};
    }

    updates.forEach(update => {
      player.gameStats[update] = req.body[update];
    });

    await player.save();
    res.json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 