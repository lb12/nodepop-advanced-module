'use strict';

const Advert = require('../models/Advert');

/**
 * GET adverts from the DB 
 * @param req can receive a 
 */
async function getAdverts (req, res, next) {
    try {

        // TODO
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};

        const adverts =  await Advert.listAll( { filter: filter, skip, limit, fields, sort } );

        res.status(200).json( { sucess : true, results : adverts } );
    } catch (error) {
        next(error);
    }
}

/**
 * POST an advert to the DB 
 * @param req receives in req.body all the fields of the advert.
 */
async function saveAdvert (req, res, next) {
    try {
        const data = req.body;
            
        const advert = new Advert(data);

        const advertSaved = await advert.save();

        return res.status(200).json( { success: true, result: advertSaved } );
    } catch (error) {
        next(error);
    }
}


/**
 * GET an advert from the DB 
 * @param req receives in req.params.id the id of the advert requested
 */
async function getAdvert (req, res, next) {
    try {
        const _id = req.params.id;

        const advert = await Advert.getOneById(_id);

        if(!advert) {
            return res.status(404).json( { success: false } );
        }

        res.status(200).json( { success: true, result: advert } );
    } catch (error) {
        next(error);
    }
}

/**
 * UPDATE an advert from the DB 
 * @param req receives in req.params.id the id of the advert requested to update
 * @param req receives in req.params.body all the fields of the advert.
 */
async function updateAdvert (req, res, next) {
    try {
        const _id = req.params.id;
        const data = req.body;

        const advertUpdated = await Advert.updateById(_id, data);

        res.status(200).json( { success: true, result: advertUpdated } );
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE an advert from the DB 
 * @param req receives in req.params.id the id of the advert requested to update
 */
async function deleteAdvert (req, res, next) {
    try {
        const _id = req.params.id;

        const advertDeleted = await Advert.deleteById(_id);

        if(!advertDeleted) 
            return res.status(404).json( { success: false } );

        res.status(200).json( { success: true, result: advertDeleted } );
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAdverts,
    getAdvert,
    saveAdvert,
    updateAdvert,
    deleteAdvert
};