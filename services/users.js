'use strict';

const fs = require('fs');

const getUsers = () => {
    let users = [];
    let file;
    try {
        file = fs.readFileSync('users.json');
        users = JSON.parse(file);
    } catch (error) {
        throw new Error('The file is not available');
    }
    return users;
};

const saveUser = users => {
    let file;
    try {
        fs.writeFileSync('users.json', JSON.stringify(users));
    } catch (error) {
        throw new Error('The file is not available');
    }
};

const all = (request, response) => {
    const users = getUsers();
    response.status(200).json(users);
};

const register = (request, response) => {
    const user = request.body;
    const users = getUsers();
    if (users.some(iterator => iterator.username === user.username)) {
        response.status(500).json({
            code: 101,
            message: 'The user exists'
        });
    } else {
        users.push(user);
        saveUser(users);
        response.status(200).json({
            code: 102,
            message: 'The user register is successful'
        });
    }
};

module.exports = {register, getUsers, all};
