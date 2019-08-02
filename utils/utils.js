'use strict';

/**
 * Aux function that checks if current request has been sent to the API
 * @param req Request object
 * @param apiPath API string on the URL (eg. /apiv)
 */
function isAPI( req, apiPath ) {
    return req.originalUrl.indexOf(apiPath) === 0;
  }

module.exports = {
    isAPI
};