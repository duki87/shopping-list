const express = require('express');
const Router = express.Router();
const ItemController = require('../controllers/Item.controller');
const authenticate = require('../middleware/verify-token').verifyAccessToken;

Router.get('/:listId/items', authenticate, ItemController.getItems);
Router.get('/:listId/items/:itemId', authenticate, ItemController.getItem);
Router.post('/:listId/items', authenticate, ItemController.createItem);
Router.patch('/:listId/items/:itemId', authenticate, ItemController.updateItem);
Router.delete('/:listId/items/:itemId', authenticate, ItemController.deleteItem);

module.exports = Router;