'use strict';

const advertController = require('../advert');

/**
 * Obtains an array of adverts and send them into a JSON.
 * @param {*} req req.query are the possible filters of adverts
 */
async function getAdverts(req, res, next) {
    const adverts = await advertController.getAdverts(req, next);
    return res.status(200).json( { sucess : true, results : adverts } );
}

/**
 * Save an advert into the DB
 * @param {*} req req.body is the data of the advert
 */
async function saveAdvert(req, res, next) {
    const advertSaved = await advertController.saveAdvert(req, next);
    return res.status(200).json( { success: true, result: advertSaved } );
}

/**
 * Obtains the requested advert
 * @param {*} req : req.params.id 
 */
async function getAdvert(req, res, next) {
    const advert = await advertController.getAdvert(req, next);

    if(!advert) {
        return res.status(404).json( { success: false } );
    }

    res.status(200).json( { success: true, result: advert } );
}

module.exports = {
    getAdverts,
    saveAdvert,
    getAdvert
}