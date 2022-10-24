const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost/Smoothie-auth';
mongoose.connect(dbURI, { useNewUrlParser: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// Set cookies -->
app.get('/set-cookie', (req,res) => {
  // res.setHeader('set-Cookie', 'newUser=true ');
  // res.send('you got the cookies!')
  // Instead of doing it like this we use 3rd party cookie installer .
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {
    maxAge: 1000*60*60*24,
    // secure: true,
    // httpOnly: true
  });
})

// Read cookies --->
app.get('/read-cookies',(req,res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})