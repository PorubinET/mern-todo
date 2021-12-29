const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;