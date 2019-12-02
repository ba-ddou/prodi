const mongoose = require('mongoose');
const models = require('./models');
const Config = require('../config');

module.exports = class Data {

    constructor(container) {
        this.config = container.get(Config);
        mongoose.connect(this.config.dbUri, { useNewUrlParser: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'db connection Error: '));
        db.once('open', _ => console.log('db connected succesfully'));

    }


    create = async (collection, dataObject) => {

        try {
            var model = models[collection];
            var document = new model(dataObject);
            await document.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        console.log('saved succesfully');

    }

    read = async (collection, query) => {
        var model = null;
        try {
            model = models[collection];
        } catch (err) {
            return false;
        }

        let res = await model.findOne(query);
        return res;
    }

    update = async () => {

    }

    delete = async () => {

    }


}