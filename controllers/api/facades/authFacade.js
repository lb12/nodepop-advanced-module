'use strict';

const authController = require('../auth');

/**
 * Obtains a token that auth an user with credentials
 */
async function authenticate(req, res, next) {
    const authObj = await authController.authenticate(req, next);

    if (!authObj.success)
        return res.status(422).json(authObj);

    return res.status(200).json(authObj);
}


module.exports = {
    authenticate
}