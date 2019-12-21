/*
*
* log service
*
*/


var Config = require('../config');
var helpers = require('./helpers');
var Data = require('../data');
// var Event = require('events');

module.exports = class Log {
    constructor(container) {
        //get config object from typedi
        this.config = container.get(Config);
        //get data object from typedi
        this.data = container.get(Data);
        // get eventPool object from typedi
    }

    get = async (queryObject) => {
        var [data,err] = await this.data.read('log', queryObject);
        if (!err) return [data,false]
        else return [false,err]
        
    }

    // this function is called save and not post because it should only be invoqued by activity listeners
    save = async (logObject) => {
        var err = await this.data.create('log', logObject);
        if (!err) console.log('log saved successfuly');
        else console.log('log save failed because ',err);
    }

}