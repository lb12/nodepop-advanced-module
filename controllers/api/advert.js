'use strict';

const { validationResult } = require('express-validator');

const Advert = require('../../models/Advert');

const createThumbnail = require('../../microservices/thumbnailer/publisher');

/**
 * GET adverts from the DB 
 * @param req can receive a list of filters and process them to obtain a list of adverts
 * @returns Adverts list
 */
async function getAdverts (req, next) {
    try {
        validationResult(req).throw();
        
        // Filters by
        const name = req.query.name;
        const forSale = req.query.for_sale;
        const tag = req.query.tag;
        const price = req.query.price;

        // Other filters
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (!isNaN(page) || page !== 1) ? (limit * page - limit) : 0;
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};


        if (name) {
            filter.name = new RegExp('^' + name, 'i'); // ^ = starts with ; i = case insensitive
        }

        if(forSale) {
            filter.for_sale = forSale;
        }

        if(tag) {
            filter.tags = tag;
        }

        if(price) {
            const priceFilterSplitted = price.split('-');

            if(priceFilterSplitted.length === 1) { // [ '50' ] value
                filter.price = parseInt(priceFilterSplitted[0]);
            } else {
                if( priceFilterSplitted[0] !== '' && priceFilterSplitted[1] !== '') { // [ '50', '60' ] min-max
                    filter.price = {$gte : parseInt(priceFilterSplitted[0]), $lte : parseInt(priceFilterSplitted[1])};
                } else if( priceFilterSplitted[0] !== '' && priceFilterSplitted[1] === '') { // [ '50', '' ] min-
                    filter.price = {$gte : parseInt(priceFilterSplitted[0])};
                } else { // [ '', '60' ] -max
                    filter.price = {$lte : parseInt(priceFilterSplitted[1])};
                } 
            }
        }

        return await Advert.listAll( { filter: filter, skip, limit, fields, sort } );
    } catch (error) {
        next(error);
    }
}

/**
 * POST an advert to the DB 
 * @param req receives in req.body all the fields of the advert.
 */
async function saveAdvert (req, next) {
    try {
        validationResult(req).throw();

        let data = req.body;
        const file = req.files;

        const photoObj = getPhotoFileObj(file); 
        data.photo = photoObj.fullname;
            
        const advert = new Advert(data);
        const advertSaved = await advert.save();
        
        // Send message to the RabbitMQ to create a new thumbnail
        const thumbnailMessage = {
            info: `${photoObj.fullname} at ${Date.now()}`,
            image: photoObj,
            quality: 75
        }
        createThumbnail(thumbnailMessage).catch(err => console.log(err));

        return advertSaved;
    } catch (error) {
        next(error);
        return;
    }
}

// Aux methods

/**
 * Get the filename of the advert photo
 * @param file Object with the advert info fields
 */
function getPhotoFileObj(file) {
    const filePath = file.photo.path;
    const splittedPath = filePath.split('/');

    const fileName = splittedPath.pop(3);
    const imagePath = splittedPath.join('/');

    const splittedFileName = fileName.split('.');
    const fileExtension = splittedFileName[ splittedFileName.length - 1 ];
    
    const fileObj = { 
        fullname: fileName,
        name: splittedFileName[0], 
        extension: fileExtension, 
        path: imagePath
    };

    return fileObj;
}


module.exports = {
    getAdverts,
    saveAdvert
};