'use strict';

// Load router with express module
const express = require('express');
const router = express.Router();

// Load multipart module
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'public/images/adverts' });

// Load express-validator module
const { query, body, param, validationResult, check } = require('express-validator');

// Code files imports
const advertFacade = require('../../controllers/api/facades/advertFacade');

// Define full list of routes
router
    .get('/', 
        [
            query('for_sale').optional().isBoolean().withMessage('Must be a boolean'),
            query('price').optional().matches(/[0-9]*-?[0-9]*/g).withMessage('Not a valid expression'),
            query('page').optional().isNumeric().withMessage('Must be a number'),
            query('limit').optional().isNumeric().withMessage('Must be a number')
        ], 
        advertFacade.getAdverts)
    .post('/', 
        multipartMiddleware, 
        [
            body('name').exists({checkFalsy: true, checkNull: true}).withMessage('Must be a string'),
            body('for_sale').exists({checkNull: true}).isBoolean().withMessage('Must be a boolean'),
            body('tags').exists({checkFalsy: true, checkNull: true}).matches(/\b(?:work|lifestyle|motor|mobile)\b/).withMessage('Not a valid tag'),
            body('tags.*').exists({checkFalsy: true, checkNull: true}).matches(/\b(?:work|lifestyle|motor|mobile)\b/).withMessage('Not a valid tag'),
            body('price').exists({checkFalsy: true, checkNull: true}).isNumeric().withMessage('Must be a number')
            
        ],
        advertFacade.saveAdvert);

// Export router
module.exports = router;