const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: String, required: true },
  isbn: { type: String, required: true },
  title: { type: String, required: true }, 
  thumbnail: { type: String }, 
  authors: { type: [String] }, 
  description: { type: String } 
});

module.exports = mongoose.model('Favorite', FavoriteSchema);

