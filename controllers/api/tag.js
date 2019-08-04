'use strict';

const Advert = require('../../models/Advert');

/**
 * GET all the distinct tags in the database
 */
async function getDistinctTags (next) {
    try {
        return await Advert.getDistinctTags();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDistinctTags
}