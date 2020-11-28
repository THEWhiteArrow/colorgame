const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Score = require('./models/ranking')

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
app.get('/', (req, res) => {
   res.render('index.ejs')
})

// SHOW SCORES
app.get('/ranking', async (req, res) => {
   try {
      const ranking = await Score.find({})
      res.render('show', { ranking })
   } catch {
      res.render('error');
   }
})
// ADD NEW SCORE
let score;
app.get('/ranking/new', (req, res) => {
   score = req.query.q;
   res.render('new', { score })
})

// SUBMIT NEW SCORE
app.post('/ranking', async (req, res) => {
   try {
      const newScore = new Score(req.body);
      newScore.score = score;
      await newScore.save()
      res.redirect('/ranking');
   } catch {
      res.render('error');
   }
})



// LISTENING
app.listen(3000, () => {
   console.log('LISTENING ON PORT 3000 !')
});