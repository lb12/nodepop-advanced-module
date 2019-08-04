'use strict';

// Load router with express module
const express = require('express');
const router = express.Router();

const tagFacade = require('../../controllers/api/facades/tagFacade');


// Define full lists of tags routes
router.get('/distinct', tagFacade.getDistinctTags);


// Export router
module.exports = router;