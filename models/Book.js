
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  authors: [String],
  description: String,
  thumbnail: String,
  infoLink: String
});

module.exports = mongoose.model('Book', bookSchema);


