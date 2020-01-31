const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('List', ListSchema, 'lists');