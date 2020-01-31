const mongoose = require('mongoose');
const Item = require('../models/item.model');
const List = require('../models/list.model');

exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find({ _listId: req.params.listId });
        return res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

exports.getItem = async (req, res, next) => {
    try {
        const item = await Item.find({ _id: req.params.itemId, _listId: req.params.listId });
        return res.status(200).json({
            success: true,
            data: item
        });
    } catch(error) {
        if(error.kind === "ObjectId") {
            res.status(500).json({
                error: "There is no list or shopping item with this id."
            });
        } else {
            res.status(500).json({
                error: "Something went wrong."
            });
        }
    }
}

exports.createItem = (req, res, next) => {
    List.findOne({ _id: req.params.listId, _userId: req.user_id })
    .then((list) => {
        if(list) {
            // list object with the specified conditions was found; currently authenticated user can create new tasks
            return true;
        }
        return false;
    }).then((canCreateNewItem) => {
        if(canCreateNewItem) {
            const newItem = new Item({
                title: req.body.title,
                price: req.body.price,
                _listId: req.params.listId
            });
            newItem.save().then((savedItem) => {
                return res.status(201).json({
                    success: true,
                    data: savedItem
                });
            }).catch((err) => {
                res.status(404).json({ error: 'TASK_CREATE_FAIL' });
            })
        } else {
            res.status(404).json({ error: 'TASK_CREATE_FAIL' });
        }
    }).catch((err) => {
        res.status(500).json({error: err})
    });
}

exports.updateItem = (req, res, next) => {
    List.findOne({ _id: req.params.listId, _userId: req.user_id })
    .then((list) => {
        if(list) {
            // list object with the specified conditions was found; currently authenticated user can create new tasks
            return true;
        }
        return false;
    }).then((canUpdateItem) => {
        if(canUpdateItem) {
            Item.updateOne({ _id: req.params.itemId, _listId: req.params.listId }, {
                $set: req.body
            }).then(updatedItem => {
                return res.status(200).json({
                    success: true,
                    data: updatedItem
                });
            }).catch(err => {
                console.log(error);
                res.status(500).json({
                    error: "Something went wrong."
                });
            });
        } else {
            res.status(404).json({ error: 'TASK_UPDATE_FAIL' });
        }
    }).catch((err) => {
        res.status(500).json({error: err})
    });
}

exports.deleteItem = async (req, res, next) => {
    List.findOne({ _id: req.params.listId, _userId: req.user_id })
    .then((list) => {
        if(list) {
            // list object with the specified conditions was found; currently authenticated user can create new tasks
            return true;
        }
        return false;
    }).then((canDeleteItem) => {
        if(canDeleteItem) {
            Item.deleteOne({ _id: req.params.itemId, _listId: req.params.listId }).then(deletedItem => {
                return res.status(200).json({
                    success: true,
                    data: deletedItem
                });
            }).catch(err => {
                console.log(error);
                res.status(500).json({
                    error: "Something went wrong."
                });
            });
        } else {
            res.status(404).json({ error: 'TASK_DELETE_FAIL' });
        }
    }).catch((err) => {
        res.status(500).json({error: err})
    });
}