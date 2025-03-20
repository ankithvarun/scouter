const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  sport: {
    type: String,
    enum: ['football'],
    required: true
  },
  playersPerTeam: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    default: 'anonymous'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed'],
    default: 'open'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema); 