'use strict';

const advertController = require('../advert');

/**
 * Obtains an array of adverts and send them into a JSON.
 * @param {*} req req.query are the possible filters of adverts
 */
async function getAdverts(req, res, next) {
    const adverts = await advertController.getAdverts(req, next);
    if(adverts)
        return res.status(200).json( { sucess : true, results : adverts } );
}

/**
 * Save an advert into the DB
 * @param {*} req req.body is the data of the advert
 */
async function saveAdvert(req, res, next) {
    const advertSaved = await advertController.saveAdvert(req, next);
    if(advertSaved)
        return res.status(200).json( { success: true, result: advertSaved } );
}

module.exports = {
    getAdverts,
    saveAdvert
}