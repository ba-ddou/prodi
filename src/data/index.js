/*
*
* Data module
* all database CRUD operation are done using this module
*
*/


const mongoose = require('mongoose');
const models = require('./models');
const Config = require('../config');

module.exports = class Data {

    constructor(container) {
        // get config object from typedi
        this.config = container.get(Config);
        // connect to mongoDb
        mongoose.connect(this.config.dbUri, { useNewUrlParser: true });
        var db = mongoose.connection;

        // connection feedback
        db.on('error', console.error.bind(console, 'db connection Error: '));
        db.once('open', _ => console.log('db connected succesfully'));

    }

    // create function
    // required parameters : 
    //      - collection (target collection name)
    //      - dataObject (the dataObject for the new document that should be created)
    create = async (collection, dataObject) => {

        try {
            // get the model that corresponds to the target collection
            var model = models[collection];
            // create new document 
            var document = new model(dataObject);
            // save document
            await document.save();
            return false;
        } catch (err) {
            console.log(err);
            return err;
        }



    }


    // read function
    // required parameters : 
    //      - collection (target collection name)
    read = async (collection, query) => {

        try {
            // get the model that corresponds to the target collection
            var model = models[collection];
            // read the entire collection
            let res = await model.find(query);
            return [res, false];
        } catch (err) {
            console.log(err);
            return [false, err];
        }

    }


    // update function
    // required parameters : 
    //      - collection (target collection name)
    //      - query (the condition object)
    //      - datatObject (the new data)
    update = async (collection, query, dataObject) => {

        try {
            // get the model that corresponds to the target collection
            var model = models[collection];
            // update the document
            let res = await model.updateOne(query, dataObject);
            return [res, false];
        } catch (err) {
            console.log(err);
            return [false, err];
        }

    }


    // update function
    // required parameters : 
    //      - collection (target collection name)
    //      - query (the condition object)
    remove = async (collection, query) => {
        try {
            // get the model that corresponds to the target collection
            var model = models[collection];
            // update the document
            let res = await model.deleteOne(query);
            return [res, false];
        } catch (err) {
            console.log(err);
            return [false, err];
        }
    }


}