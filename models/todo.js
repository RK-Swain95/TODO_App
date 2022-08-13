const mongoose = require('mongoose');

// creating Schema for Tasks
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


const Todo = mongoose.model('Todo', todoSchema);

// exporting the Schema
module.exports = Todo;