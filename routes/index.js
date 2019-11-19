'use strict';

// Load router with express module
const express = require('express');
const router = express.Router();

// Define full list of routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

// Export router
module.exports = router;
