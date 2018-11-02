'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const services = require('./services');
const middlewares = require('./middlewares');

app.get('/', (request, response) => {
    response.send('Hello! The API is at http://localhost:' + PORT + '/api');
});

app.post('/authenticate', services.auth.authenticate);

// API ROUTES -------------------

const userRouter = express.Router();
userRouter.use(middlewares.authorize);

userRouter.get('/', services.users.all);
userRouter.post('/register', services.users.register);

const postRouter = express.Router();
postRouter.get('/', services.blog.getPosts);
postRouter.use(middlewares.authorize);
postRouter.post('/create', services.blog.createPost);

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.listen(PORT);

console.log(colors.green('Magic happens at http://localhost:' + PORT));
