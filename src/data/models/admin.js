/*
*
*Admin model
*
*/


const mongoose = require('mongoose');


var adminSchema = new mongoose.Schema({
        username : String,
        hashedPassword : String
    });


var admin = mongoose.model('admin', adminSchema);

module.exports = admin;
