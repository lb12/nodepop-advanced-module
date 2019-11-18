'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        const token = req.body.token || req.query.token || req.get('Authorization').split(' ')[1];

        console.log(token);

        // If token does not exist, send an error
        if(!token) {
            const error = new Error('no token provided');

            error.status = 401;
            next(error);
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                error.status = 401;
                next(error);
                return;
            }
            
            req.apiUserId = payload._id;
            next();
        });        
    };
};