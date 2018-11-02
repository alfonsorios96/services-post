'use strict';

const getUsers = require('./users').getUsers;
const jwt = require('jsonwebtoken');

const authenticate = (request, response) => {
    const user = request.body;
    const users = getUsers();
    const match = users.filter(iterator => iterator.username === user.username);
    if (match.length !== 0) {
        const userFound = match[0];
        if (userFound.password !== user.password) {
            response.status(500).json({status: 'error', message: 'Authentication failed. Wrong password.'});
        } else {
            const token = jwt.sign(userFound, 'secret_hash', {
                expiresIn: '2 minutes'
            });
            response.status(200).json({
                status: 'success',
                message: 'Logged success',
                token
            });
        }
    } else {
        response.status(500).json({
            status: 'error',
            message: 'The user doesn\'t exist'
        });
    }
};

module.exports = {authenticate};
