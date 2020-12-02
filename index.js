const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Score = require('./models/ranking');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://whitearrow:dt61A1DT.@colorgame.c4s8l.mongodb.net/colorGame?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
   console.log('Database connected');
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
   const sortedScores = sortingObj(scores);
   res.render('ranking', { sortedScores });
})

// SUBMIT NEW RECORD
app.post('/ranking', async (req, res) => {
   console.log(req.body)
   const newRecord = new Score(req.body);
   await newRecord.save();
   res.redirect('/ranking');
})

// INVALID ROUTE / ERROR
app.get('/*', (req, res) => {
   res.render('error');
})




app.listen(PORT, () => {
   console.log('APP IS LISTENING ON PORT 3000')
})

//##########################        FUNCTIONS
const findRecord = async () => {
   const scores = await Score.find({})
   if (scores.length !== 0) {
      return (scores.reduce((prev, current) => {
         return (prev.score < current.score) ? current : prev;
      }))
   } else {
      return { user: 'No data', score: 0 }
   }
}

const sortingObj = (arr) => {
   const l = arr.length;
   for (let i = 0; i < l; i++) {
      for (let j = 1; j < l - i; j++) {
         if (arr[j].score > arr[j - 1].score) {
            let x = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = x;
         }
      }
   }
   return arr;
}