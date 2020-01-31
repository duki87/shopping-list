const express = require('express');
const Router = express.Router();
const ListController = require('../controllers/List.controller');
const authenticate = require('../middleware/verify-token').verifyAccessToken;

Router.get('/', authenticate, ListController.getLists);
Router.get('/:id', authenticate, ListController.getList);
Router.post('/', authenticate, ListController.createList);
Router.patch('/:id', authenticate, ListController.updateList);
Router.delete('/:id', authenticate, ListController.deleteList);

module.exports = Router;