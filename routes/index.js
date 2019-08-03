'use strict';

// Load router with express module
var express = require('express');
var router = express.Router();

const advertFacade = require('../controllers/front/facades/advertFacade');

// Define full list of routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

// Export router
module.exports = router;
