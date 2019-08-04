'use strict';

const advertController = require('../../api/advert');

/**
 * Render a page with the adverts paginated
 * @param {*} req req.query are the possible filters of adverts
 */
async function renderAdvertsPage(req, res, next) {
    const adverts = await advertController.getAdverts(req, next);
    res.render('show-adverts', { adverts, title: 'Adverts' });
}

/**
 * Render a page with the advert requested
 * @param {*} req : req.params.id 
 */
async function renderAdvertPage(req, res, next) {
    const advert = await advertController.getAdvert(req, next);

    if(!advert) {
        let error = new Error('Advert nor found');
        error.status = 404;
        next(error);
        return;
    }

    res.render('show-advert', { advert });
}

module.exports = {
    renderAdvertsPage,
    renderAdvertPage
}