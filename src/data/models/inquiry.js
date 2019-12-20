/*
*
* Inquiry model
*
*/


const mongoose = require('mongoose');


var inquirySchema = new mongoose.Schema({
        name : String,
        email : String,
        phone : String,
        message : String,
        products : [String],
        opened : Boolean
    });


var inquiry = mongoose.model('inquiry', inquirySchema);

module.exports = inquiry;