'use strict';

const express = require('express');
const router = express.Router();
let config = require('../../config.js');

router.get('/', (req, res) => {
  console.log('i am Logedin');
  let welcome = { message: 'Welcome to the coolest API on earth!' };
  res.status(200).json(welcome);
});

module.exports = router;