const express = require('express');
const app = express();
const path = require('path');

//##########################        MIDDLEWARE        ######################
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//##########################        ROUTES         ######################

app.get('/', (req, res) => {
   res.render('index')
})

app.post('/', (req, res) => {
   console.log(req.body)
   res.send(req.body)
})


app.listen(3000, () => {
   console.log('APP IS LISTENING ON PORT 3000')
})