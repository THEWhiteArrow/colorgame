const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
   user: {
      type: String,
      required: true
   },
   score: {
      type: Number,
      required: true,
      min: 0
   }
})

const Score = mongoose.model('Score', rankingSchema);

module.exports = Score;