
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  description: String,
  thumbnail: String,
  infoLink: String
});

module.exports = mongoose.model('Book', bookSchema);

// /models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId: String 
});

module.exports = mongoose.model('Favorite', favoriteSchema);
