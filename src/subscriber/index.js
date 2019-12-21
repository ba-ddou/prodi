/*
*
* init all listeners | subscribe to all events in map.js
*
*
*/

const Event = require('events');
const map = require('./map');
const log = require('../services/log')

module.exports = class Subscriber{
    constructor(container){
        this.eventPool = container.get(Event);
        this.logService = container.get(log);
        this.init();
    }


    init(){
        for(let record of map){
            for(let subscriber of record.subscribers){
                this.eventPool.on(record.event,subscriber(this.logService));
                console.log('subscriber is listenning for '+record.event)
            }
        }
    }
}

