'use strict';

const jwt = require('jsonwebtoken');

const authorize = (request, response, next) => {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret_hash', (error, decoded) => {
            if (error) {
                return response.status(403).json({code: 107, message: 'Failed to authenticate token.'});
            } else {
                request.decoded = decoded;
                next();
            }
        });

    } else {
        return response.status(403).send({
            code: 108,
            message: 'No token provided.'
        });

    }
};

module.exports = {authorize};
