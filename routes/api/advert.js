'use strict';

// Load Router with express module
const express = require('express');
const router = express.Router();

const advertController = require('../../controllers/advert');

// Define full list of routes
router
    .get('/', advertController.getAdverts)
    .post('/', advertController.saveAdvert);
    
router
    .get('/:id', advertController.getAdvert)
    .put('/:id', advertController.updateAdvert)
    .delete('/:id', advertController.deleteAdvert);


// Export router
module.exports = router;