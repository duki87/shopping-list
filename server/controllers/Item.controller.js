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

exports.createItem = async (req, res, next) => {
    try {
        const item = new Item({
            title: req.body.title,
            price: req.body.price,
            _listId: req.params.listId
        });
        const savedItem = await item.save();
        return res.status(201).json({
            success: true,
            data: savedItem
        });
    } catch(error) {
        console.log(error);
        if(error.code === 11000) {
            res.status(500).json({
                error: "This item already exists."
            });
        } else {
            res.status(500).json({
                error: "Something went wrong."
            });
        }
    }
}

exports.updateItem = (req, res, next) => {
    List.findOne({ _id: req.params.listId }).then(list => {
        if(!list) {
            res.status(500).json({
                error: "Selected list doesn' t exist."
            });
        }   
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
    }).catch(err => {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong."
        });
    });
}

exports.deleteItem = async (req, res, next) => {
    List.findOne({ _id: req.params.listId }).then(list => {
        if(!list) {
            res.status(500).json({
                error: "Selected list doesn' t exist."
            });
        }   
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
    }).catch(err => {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong."
        });
    });
}