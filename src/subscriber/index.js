/*
*
* init all listeners | subscribe to all events in map.js
*
*
*/

const Event = require('events');
const map = require('./map');
const Data = require('../data')

module.exports = class Subscriber{
    constructor(container){
        this.eventPool = container.get(Event);
        this.data = container.get(Data);
        this.init();
    }


    init(){
        for(let record of map){
            for(let subscriber of record.subscribers){
                this.eventPool.on(record.event,subscriber(this.data));
                console.log('subscriber is listenning for '+record.event)
            }
        }
    }
}

