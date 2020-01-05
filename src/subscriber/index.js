/*
*
* init all listeners | subscribe to all events in map.js
*
*
*/


const map = require('./map');

module.exports = class Subscriber{
    constructor(container){
        this.eventPool = container.get("eventPool");
        this.logService = container.get("logService"); // the log service is instantiated and added to typedi in routes/log
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

