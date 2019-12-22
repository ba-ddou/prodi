/*
*
* log model
*
*/


const mongoose = require('mongoose');


var logSchema = new mongoose.Schema({
        admin : String,  // the _id of the admin responsible for this activity
        targetCollection : String, // the target collection 
        method : String, // the type operation
        ogDocument : {type : String, default : 'undefined'}, // the target document before it was altered
        document : String, // the modified document
        timestamp : { type : Date, default: Date.now } 
    });


var log = mongoose.model('log', logSchema);

module.exports = log;