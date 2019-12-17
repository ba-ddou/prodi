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
            console.log('product',dataObject,'saved succesfully');
            return false;
        } catch (err) {
            console.log(err);
            return err;
        }
        
        

    }

    read = async (collection, query) => {
        
        try {
            var model = models[collection];
            let res = await model.find(query);
            return [res,false];
        } catch (err) {
            console.log(err);
            return [false,err];
        }
        
    }

    

    update = async () => {

    }

    delete = async () => {

    }


}