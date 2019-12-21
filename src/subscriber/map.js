/*
*
*   List of all events and their corresponding listenners
*   Defines which event should each listenner subscribe to
*
*
*
*/

const adminactivity = require('./listeners/adminactivity');


module.exports = [
    {
        event : 'adminactivity',
        subscribers : [adminactivity]
    }
]
