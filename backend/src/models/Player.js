const mongoose = require('mongoose');

const gameStatsSchema = new mongoose.Schema({
  goals: {
    type: Number,
    default: 0
  },
  assists: {
    type: Number,
    default: 0
  },
  yellowCards: {
    type: Number,
    default: 0
  },
  redCards: {
    type: Number,
    default: 0
  }
});

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  isRegistered: {
    type: Boolean,
    default: false
  },
  gameStats: {
    type: gameStatsSchema
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema); 