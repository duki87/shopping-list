const mongoose = require('mongoose');
const List = require('../models/list.model');
const Item = require('../models/item.model');

exports.getLists = async (req, res, next) => {
    try {
        const lists = await List.find({ _userId: req.user_id });
        return res.status(200).json({
            success: true,
            count: lists.length,
            data: lists
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

exports.getList = async (req, res, next) => {
    try {
        const lists = await List.findOne({ _id: req.params.id });
        if(lists === null) {
            return res.status(500).json({
                error: 'NOT_FOUND'
            });
        }
        return res.status(200).json({
            success: true,
            //count: lists.length,
            data: lists
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

exports.createList = async (req, res, next) => {
    try {
        const list = new List({
            title: req.body.title,
            _userId: req.user_id
        });
        const saveList = await list.save();
        return res.status(201).json({
            success: true,
            data: saveList
        });
    } catch(error) {
        console.log(error);
        if(error.code === 11000) {
            res.status(500).json({
                error: "This list already exists."
            });
        } else {
            res.status(500).json({
                error: error
            });
        }
    }
}

exports.updateList = async (req, res, next) => {
    let id = req.params.id;
    try {
        const update = await List.updateOne({ _id: id, _userId: req.user_id }, {
            $set: req.body
        });
        return res.status(201).json({
            success: true,
            data: update
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong."
        });
    }
}

exports.deleteList = (req, res, next) => {
    let id = req.params.id;
    List.deleteOne({ _id: id, _userId: req.user_id }).then((deleted) => {
        deleteItems(id);
        return res.status(201).json({
            success: true,
            data: deleted
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}
    

const deleteItems = (_listId) => {
    Item.deleteMany({ _listId: _listId }).then((deleted) => {
        console.log(deleted);
    }).catch((err) => console.log(err));
}