const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    }
});

module.exports = mongoose.model('List', ListSchema, 'lists');