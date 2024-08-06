const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: String, required: true },
  isbn: { type: String, required: true },
  title: { type: String, required: true }, // Додано
  thumbnail: { type: String }, // Додано
  authors: { type: [String] }, // Додано
  description: { type: String } // Додано
});

module.exports = mongoose.model('Favorite', FavoriteSchema);

