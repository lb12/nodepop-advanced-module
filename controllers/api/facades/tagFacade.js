'use strict';

const tagController = require('../tag');

/**
 * Obtains an array of distinct adverts and send them into a JSON.
 */
async function getDistinctTags(req, res, next) {
    const tags = await tagController.getDistinctTags(next);
    if(tags)
        return res.status(200).json( { sucess : true, results : tags } );
}

module.exports = {
    getDistinctTags
}