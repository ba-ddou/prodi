/*
*
* adminactivity event listener
* record admin activites in the logs collections
*
*/




module.exports = (logService)=>{
    return async (logObject)=>{
        console.log('*************adminactivity event listener****************');
        logService.save(logObject);
    }
}