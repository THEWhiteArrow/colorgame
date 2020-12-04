const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { catchAsync, ExpressError, findRecord, sortArr } = require('./utils')
const Score = require('./models/ranking');


const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/colorGame', {
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
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//##########################        ROUTES

// GAME OR FETCH DATA
app.get('/', catchAsync(async (req, res, next) => {
   const record = await findRecord();
   if (req.query.q === 'fetch') {
      res.send(record)
   } else {
      res.render('index', { record })
   }
}));
// SHOW RANKINGS
app.get('/ranking', catchAsync(async (req, res, next) => {
   const scores = await Score.find({});
   const sortedScores = sortArr(scores);
   res.render('ranking', { sortedScores });
}));

// SUBMIT NEW RECORD
app.post('/ranking', catchAsync(async (req, res, next) => {
   console.log(req.body)
   const newRecord = new Score(req.body);
   await newRecord.save();
   res.redirect('/ranking');
}));

// INVALID ROUTE / ERROR
app.all('*', (req, res, next) => {
   throw new ExpressError('Invalid Path Route', 404)
});





app.use((err, req, res, next) => {
   const { statusCode = 500, message = 'Oh No Error!' } = err;
   res.status(statusCode).render('error', { err });

});


app.listen(PORT, () => {
   console.log('APP IS LISTENING ON PORT 3000')
});