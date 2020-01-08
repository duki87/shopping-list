const express = require('express');
const Router = express.Router();
const ListController = require('../controllers/List.controller');

Router.get('/', ListController.getLists);
Router.post('/', ListController.createList);
Router.patch('/:id', ListController.updateList);
Router.delete('/:id', ListController.deleteList);

module.exports = Router;