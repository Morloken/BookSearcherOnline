const Favorite = require('../models/Favorite');

exports.addToFavorites = async (req, res) => {
  try {
    let { isbn } = req.body;
    
    console.log('Received isbn:', isbn);

    if (!isbn) {
      return res.status(400).json({ message: 'ISBN is required' });
    }

    let userId = 'defaultUserId'; 

    let existingFavorite = await Favorite.findOne({ isbn, userId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Book is already in favorites' });
    }

    let favorite = new Favorite({ isbn, userId });
    await favorite.save();
    res.json({ message: 'Book added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Error adding to favorites' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    let userId = 'defaultUserId'; 

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    let favorites = await Favorite.find({ userId }).populate('isbn');
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};



exports.removeFavorite = async (req, res) => {
  try {
    let { isbn } = req.body;
    console.log('Received isbn:', isbn);
    if (!isbn) {
      return res.status(400).json({ message: 'ISBN is required' });
    }
    let userId = 'defaultUserId';
    await Favorite.deleteOne({ isbn, userId });
    res.json({ message: 'Book removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Error removing from favorites' }); 
  }
};
