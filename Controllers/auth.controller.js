const express = require('express');
const auth = express.Router();
const jwt = require('jsonwebtoken');
const users = require('../Model/db');

const secret_key = 'qwerty';

auth.get('/data', checkAuth, (req, res) => {
  const phone = req.decode.phone;
  const password = req.decode.password;
  res.status(200).send('Success : Data from SERVER');
});

function checkAuth(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    try {
      const decode = jwt.verify(token, secret_key);
      req.decode = decode;
      next();
    } catch (error) {
      res.status(498).send('invalid TOKEN');
    }
  } else {
    console.log('Access token not received from Frontend');
    res.status(404).send('Access token not received ');
  }
}

auth.post('/login', (req, res) => {
  console.log(req.body);
  const phone = parseInt(req.body.phone);
  const password = parseInt(req.body.password);
  if (phone && password !== '') {
    if (phone === users.phone) {
      if (password === users.password) {
        const token = jwt.sign(
          { phone: phone, password: password },
          secret_key
        );
        res.status(200).json({ msg: token });
      } else {
        res.status(403).send('phone or password is incorrect');
      }
    } else {
      res.status(404).send('user dosent exist');
    }
  } else {
    res.status(409).send('Username or password should not be empty');
  }
});

module.exports = auth;
