 const express = require('express');
 const connectDB = require('./config/db');
 
 const app = express();

 //Connect Database
 connectDB();

 // Init Middleware
 app.use(express.json({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.get('/', (req, res) => res.send('APP runing !!! :>> '));

 // Define routes
 app.use('/api/users', require('./routes/api/users'));
 app.use('/api/auth', require('./routes/api/auth'));
 app.use('/api/profile', require('./routes/api/profile'));
 app.use('/api/posts', require('./routes/api/posts'));
 
 const PORT = process.env.PORT || 5000;
  
 app.listen(PORT, () => console.log('Yooooo port = ', PORT));