/*
*
* log model
*
*/


const mongoose = require('mongoose');


var logSchema = new mongoose.Schema({
        admin : String,  // the username of the admin responsible for this activity
        targetCollection : String, // the target collection 
        method : String, // the type operation
        ogDocument : {type : String, default : 'undefined'}, // the target document before it was altered
        document : String, // the document after the operation | the document data if it's a DELETE, or an _id if it's a POST or PUT
        timestamp : { type : Date, default: Date.now } 
    });


var log = mongoose.model('log', logSchema);

module.exports = log;