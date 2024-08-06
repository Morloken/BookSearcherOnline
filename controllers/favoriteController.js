let Favorite = require('../models/Favorite');
let Book = require('../models/Book');

exports.addToFavorites = async (req, res) => {
  try {
    let { bookId } = req.body;
   // let userId = req.user.id; 
    // will have autentification of the user in future
    let favorite = new Favorite({ bookId, userId });
    await favorite.save();
    res.json({ message: 'Book added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    let userId = req.user.id;
    let favorites = await Favorite.find({ userId }).populate('bookId');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};