const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/',(req, res) => {
  res.render('index');
});

app.get('/problem', (req, res) => {
  res.render('problem', {prompt: "What is 2 + 2", hint: 'count two fingers on each hand'});
});

app.get('/welcome',(req, res) => {
  res.render('welcome');
});

app.listen(3000, () => {
  console.log('Math Quiz is running on localhost:3000')
});
