'use strict';

const Advert = require('../../models/Advert');

/**
 * POST an advert to the DB 
 * @param req receives in req.body all the fields of the advert.
 */
async function getDistinctTags (req, next) {
    try {
        return await Advert.getDistinctTags(req, next);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDistinctTags
}