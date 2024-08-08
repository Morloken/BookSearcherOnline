require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/books'); 
const favoriteRoutes = require('./routes/favorites'); 

const app = express();

app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to BookSearchDB');

    app.use('/api/books', bookRoutes);
    app.use('/api/favorites', favoriteRoutes);
    
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public',"index.html"));
    });
    
    app.get('/public/js/main.js', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'js', 'main.js'));
    });
    
    app.get('/public/css/styles.css', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'css', 'styles.css'));
    });
    
    // app.get('/public/fonts/roboto-v18-latin-regular.woff2', (req, res) => {
    //   res.sendFile(path.join(__dirname, 'public', 'fonts', 'roboto-v18-latin-regular.woff2'));
    // });
    
    // app.get('/public/fonts/roboto-v18-latin-700.woff2', (req, res) => {
    //   res.sendFile(path.join(__dirname, 'public', 'fonts', 'roboto-v18-latin-700.woff2'));
    // });
    
    app.get('/public/js/jquery-3.6.0.min.js', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'js', 'jquery-3.6.0.min.js'));
    });


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

startServer();
