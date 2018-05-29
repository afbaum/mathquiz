const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/register', (req, res, next) => {
    return res.render('register')
});

router.post('/register', (req, res, next) => {
    if (req.body.email &&
      req.body.name &&
      req.body.password &&
      req.body.confirmPassword) {

        //confirm that user typed sme password twice
        if (req.body.password !== req.body.confirmPassword) {
          const err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }

        //create object with form input
        const userData = {
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        };

        // user schema's create method to indert document into mongo
        User.create(userData, (error, user) => {
          if (error) {
            return next(error);
          } else {
            return res.redirect('/quiz');
          }
        });

      } else {
        const err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
});

router.get('/',(req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', {name});
  } else {
    res.redirect('/register');
  }
});

router.get('/welcome', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
  res.render('welcome');
  }
});

router.post('/welcome',(req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

router.post('/goodbye',(req, res) => {
  res.clearCookie('username');
  res.redirect('/welcome');
});

module.exports = router;
