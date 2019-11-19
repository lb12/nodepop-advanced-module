'use strict';

// Load router with express module
const express = require('express');
const router = express.Router();

const advertFacade = require('../controllers/front/facades/advertFacade');

// Define full list of routes
router.get('/', advertFacade.renderAdvertsPage);

// Export router
module.exports = router;
