const express = require('express');
const Router = express.Router();
const ItemController = require('../controllers/Item.controller');

Router.get('/:listId/items', ItemController.getItems);
Router.get('/:listId/items/:itemId', ItemController.getItem);
Router.post('/:listId/items', ItemController.createItem);
Router.patch('/:listId/items/:itemId', ItemController.updateItem);
Router.delete('/:listId/items/:itemId', ItemController.deleteItem);

module.exports = Router;