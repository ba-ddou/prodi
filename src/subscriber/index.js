/*
*
* Init all listeners 
*
*
*/


const map = require('./map');

module.exports = class Subscriber{
    constructor(container){
        // get eventPool object from typedi
        this.eventPool = container.get("eventPool");
        // get logService object from typedi
        this.logService = container.get("logService"); // the log service is instantiated and added to typedi in routes/log
        this.init();
    }

    // subscribe to all events in the map
    init(){
        for(let record of map){
            for(let subscriber of record.subscribers){
                this.eventPool.on(record.event,subscriber(this.logService));
                console.log('subscriber is listenning for '+record.event)
            }
        }
    }
}

