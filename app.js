require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/books'); 
const favoriteRoutes = require('./routes/favorites'); 

const app = express();

app.use(express.json());





const helmet = require('helmet');


// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.originAgentCluster());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());


// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "https://code.jquery.com"],
//       styleSrc: ["'self'", "https://fonts.googleapis.com"],
//       fontSrc: ["'self'", "https://fonts.gstatic.com"],
//       imgSrc: ["'self'", "data:"],
//       connectSrc: ["'self'"],
//       frameSrc: ["'none'"],
//       objectSrc: ["'none'"],
//       baseUri: ["'none'"],
//       formAction: ["'none'"],
//       upgradeInsecureRequests: [],
//       styleSrcElement: ["'self'", "https://fonts.googleapis.com"],
//       styleSrcAttr: ["'self'", "https://fonts.googleapis.com"],
//       mediaSrc: ["'none'"],
//       childSrc: ["'none'"],
//       workerSrc: ["'none'"],
//       objectSubrequest: ["'none'"],
//     },
//   })
// );


// const csp = `
//   default-src 'self';
//   script-src 'self' https://code.jquery.com;
//   style-src 'self' https://fonts.googleapis.com;
//   font-src 'self' https://fonts.gstatic.com;
// `;

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', csp.replace(/\n/g, ' '));
//   next();
// });

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

startServer();
