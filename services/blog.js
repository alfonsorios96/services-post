'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');

const readPosts = () => {
    let file, posts = [];
    try {
        file = fs.readFileSync('posts.json');
        posts = JSON.parse(file);
    } catch (error) {
        throw new Error(error);
    }
    return posts;
};

const savePosts = posts => {
    try {
        fs.writeFileSync('posts.json', JSON.stringify(posts));
    } catch (error) {
        throw new Error(error);
    }
};

const getPosts = (request, response) => {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const posts = readPosts();
    if (token) {
        jwt.verify(token, 'secret_hash', (error) => {
            if (error) {
                return response.status(200).json(posts.filter(post => !post.isProtected));
            } else {
                return response.status(200).json(posts);
            }
        });

    } else {
        return response.status(200).send(posts.filter(post => !post.isProtected));

    }
};

const createPost = (request, response) => {
    const posts = readPosts();
    posts.push(request.body);
    savePosts(posts);
    response.status(200).json({
        status: 'success',
        message: 'Post created!'
    });
};

module.exports = {getPosts, createPost};
