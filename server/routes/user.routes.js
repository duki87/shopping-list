const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/User.controller');
const tokenMiddleware = require('../middleware/verify-token');

//Get list of all users
Router.get('/', UserController.getUsers);
//Register user
Router.post('/', UserController.createUser);
//Login user
Router.post('/login', UserController.loginUser);
//Access token
Router.get('/me/access-token', tokenMiddleware.verifyRefreshToken, UserController.accessToken);
/* 
Router.patch('/:id', UserController.updateUser);
Router.delete('/:id', UserController.deleteUser);
Router.get('/:id', UserController.getUser); */


module.exports = Router;