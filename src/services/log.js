/*
*
* log service
*
*/



var helpers = require('./helpers');

// var Event = require('events');

module.exports = class Log {
    constructor(container) {
        //get config object from typedi
        this.config = container.get("config");
        //get data object frm typedi
        this.data = container.get("data");

    }

    get = async (queryObject) => {
        // parse the queryObject received from the client to a valid JS object
        var query = helpers.parseProductQueryObject(queryObject);
        console.log(query);
        //asynchronous call to the data object's read function
        var [data,err] = await this.data.read('log', query);
        if (!err){
            // create next page token
            let nextPageToken = helpers.createNextPageToken(queryObject,data,this.config.jwtPrivateKey);
            return [{nextPageToken,data},false,200]
        } 
        else return [false,err,500]
        
    }

    // this function is called save and not post because it should only be invoqued internally | logs can only be created by the system
    save = async (logObject) => {
        var [_id,err] = await this.data.create('log', logObject);
        if (!err) console.log('log saved successfuly');
        else console.log('log save failed because ',err);
    }

}