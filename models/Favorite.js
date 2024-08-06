
// const mongoose = require('mongoose');

// const favoriteSchema = new mongoose.Schema({
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
//   userId: String 
// });

// module.exports = mongoose.model('Favorite', favoriteSchema);

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: String, required: true } // Може бути ObjectId, якщо у вас є модель User
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
