const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Score = require('./models/ranking');



mongoose.connect('mongodb://localhost:27017/colorGame', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('MONGO CONNECTION OPEN')
   })
   .catch(err => {
      console.log('OH NO MONGO ERROR !', err)
   });

// MIDDLE WARE
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// ROUTES
app.get('/game', async (req, res) => {
   const record = await Score.findOne()
   console.log(record.score)
   res.render('index.ejs', { record });
})

// SUBMITING NEW PRODUCT
app.post('/game', async (req, res) => {

   // res.redirect(`/index.ejs`);
})

// ERROR
app.get('*', (req, res) => {
   res.render('error');
})

// LISTENING
app.listen(3000, () => {
   console.log('LISTENING ON PORT 3000 !')
});