const mongoose = require('mongoose');
const List = require('../models/list.model');

exports.getLists = async (req, res, next) => {
    try {
        const lists = await List.find();
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

exports.createList = async (req, res, next) => {
    try {
        const list = await List.create(req.body);
        console.log(list)
        return res.status(201).json({
            success: true,
            data: list
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
        const update = await List.updateOne({ _id: id }, {
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

exports.deleteList = async (req, res, next) => {
    let id = req.params.id;
    try {
        const deleteList = await List.deleteOne({ _id: id });
        return res.status(201).json({
            success: true,
            data: deleteList
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong."
        });
    }
}