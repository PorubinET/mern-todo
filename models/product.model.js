const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true}, 
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);

// text: {type: String, max: 30},
// done: {type: Boolean, default: false},