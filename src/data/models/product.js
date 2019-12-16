/*
*
*Admin model
*
*/


const mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
        name : String,
        description : String,
        price : Number,
        category : String,
        count : Number,
        sales : Number,
        tags : [String]
    });


var product = mongoose.model('product', productSchema);

module.exports = product;
