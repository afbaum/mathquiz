const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const routes = require('./routes');
const quizRoutes = require('./routes/quiz');

app.use(routes);
app.use('/quiz', quizRoutes);

app.listen(3000, () => {
  console.log('Math Quiz is running on localhost:3000')
});
