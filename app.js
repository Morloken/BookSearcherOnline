
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/books');
const favoriteRoutes = require('./routes/favorites');



dotenv.config(); 

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected to BookSearchDB'))
  .catch(err => console.log(err));


app.use('/api/books', bookRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


