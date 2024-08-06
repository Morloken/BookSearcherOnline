let express = require('express');
let router = express.Router();
let bookController = require('../controllers/bookController');

router.get('/search', bookController.searchBooks);

module.exports = router;