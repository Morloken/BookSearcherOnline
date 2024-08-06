let express = require('express');
let router = express.Router();
let favoriteController = require('../controllers/favoriteController');

router.post('/add', favoriteController.addToFavorites);
router.get('/', favoriteController.getFavorites);
router.post('/remove', favoriteController.removeFavorite);

module.exports = router;