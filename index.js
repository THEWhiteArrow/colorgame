const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Score = require('./models/ranking');

mongoose.connect('mongodb://localhost:27017/colorGame', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
})
   .then(() => {
      console.log('MONGO CONNECTION OPEN')
   })
   .catch(err => {
      console.log('OH NO MONGO ERROR !', err)
   });

//##########################        MIDDLEWARE

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//##########################        ROUTES

// GAME OR FETCH DATA
app.get('/', async (req, res) => {
   const record = await findRecord();
   if (req.query.q === 'fetch') {
      res.send(record)
   } else {
      res.render('index', { record })
   }
})
// SHOW RANKINGS
app.get('/ranking', async (req, res) => {
   const scores = await Score.find({});
   const l = getLength(scores);
   res.render('ranking', { scores, l })
})

// SUBMIT NEW RECORD
app.post('/ranking', async (req, res) => {
   console.log(req.body)
   const newRecord = new Score(req.body);
   await newRecord.save();
   res.redirect('/ranking');
})

// INVALID ROUTE / ERROR
app.get('*', (req, res) => {
   res.render('error');
})




app.listen(3000, () => {
   console.log('APP IS LISTENING ON PORT 3000')
})

//##########################        FUNCTIONS
const findRecord = async () => {
   const scores = await Score.find({})
   if (Object.keys(scores).length !== 0) {
      return (scores.reduce((prev, current) => {
         return (prev.score < current.score) ? current : prev;
      }))
   } else {
      return { user: 'No data', score: 0 }
   }
}

const getLength = (obj) => {
   let l = 0;
   for (let i in obj) {
      l += 1
   }
   return l;
}