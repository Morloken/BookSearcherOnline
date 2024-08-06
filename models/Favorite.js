
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId: String 
});

module.exports = mongoose.model('Favorite', favoriteSchema);