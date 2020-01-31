const mongoose = require('mongoose');
const List = require('../models/list.model');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        //unique: true
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: List
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Item', ItemSchema, 'shopping-items');