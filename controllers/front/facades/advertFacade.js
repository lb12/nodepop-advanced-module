'use strict';

const advertController = require('../../api/advert');

/**
 * Render a page with the adverts paginated
 * @param {*} req req.query are the possible filters of adverts
 */
async function renderAdvertsPage(req, res, next) {
    const adverts = await advertController.getAdverts(req, next);
    if(adverts)
        res.render('show-adverts', { adverts, title: 'Adverts' });
}

module.exports = {
    renderAdvertsPage
}