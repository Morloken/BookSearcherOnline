const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  isbn: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
