'use strict';

// Load router with express module
const express = require('express');
const router = express.Router();

const advertFacade = require('../../controllers/api/facades/advertFacade');

// Define full list of routes
router
    .get('/', advertFacade.getAdverts)
    .post('/', advertFacade.saveAdvert);
    
router
    .get('/:id', advertFacade.getAdvert)


// Export router
module.exports = router;