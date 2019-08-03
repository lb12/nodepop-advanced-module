'use strict';

const Advert = require('../../models/Advert');

/**
 * GET adverts from the DB 
 * @param req can receive a list of filters and process them to obtain a list of adverts
 * @returns Adverts list
 */
async function getAdverts (req, next) {
    try {

        // TODO
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};

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
        const data = req.body;
            
        const advert = new Advert(data);

        return await advert.save();
    } catch (error) {
        next(error);
    }
}


/**
 * GET an advert from the DB 
 * @param req receives in req.params.id the id of the advert requested
 */
async function getAdvert (req, next) {
    try {
        const _id = req.params.id;

        return await Advert.getOneById(_id);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAdverts,
    getAdvert,
    saveAdvert
};