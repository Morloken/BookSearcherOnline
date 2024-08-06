const axios = require('axios');
const Book = require('../models/Book');

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const books = response.data.items.map(item => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || 'No description available',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      infoLink: item.volumeInfo.infoLink || ''
    }));

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error searching books' });
  }
};