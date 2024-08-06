const Favorite = require('../models/Favorite');
const Book = require('../models/Book');

exports.addToFavorites = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id; // will have autentification of the user in future
    const favorite = new Favorite({ bookId, userId });
    await favorite.save();
    res.json({ message: 'Book added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.find({ userId }).populate('bookId');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};