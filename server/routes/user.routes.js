const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/User.controller');

Router.get('/', UserController.getUsers);
Router.get('/:id', UserController.getUser);
Router.post('/', UserController.createUser);
Router.patch('/:id', UserController.updateUser);
Router.delete('/:id', UserController.deleteUser);

module.exports = Router;