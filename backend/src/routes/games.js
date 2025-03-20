const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Create a new game
router.post('/', async (req, res) => {
  try {
    const game = new Game({
      ...req.body,
      // For now, we'll just use the data sent from frontend
      creatorId: req.body.creatorId || 'anonymous'
    });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find()
      .populate('creatorId', 'name')
      .populate('players', 'name position');
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('creatorId', 'name')
      .populate('players', 'name position gameStats');
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update game status
router.patch('/:id/status', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['status'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    updates.forEach(update => game[update] = req.body[update]);
    await game.save();
    
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add player to game
router.post('/:id/players', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (game.players.includes(req.body.playerId)) {
      return res.status(400).json({ error: 'Player already in game' });
    }

    game.players.push(req.body.playerId);
    await game.save();
    
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove player from game
router.delete('/:id/players/:playerId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    game.players = game.players.filter(
      playerId => playerId.toString() !== req.params.playerId
    );
    
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 