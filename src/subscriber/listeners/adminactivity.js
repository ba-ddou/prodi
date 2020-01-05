/*
*
* adminactivity event listener
* record admin activites in the logs collections
*
*/




module.exports = (logService)=>{
    return async (logObject)=>{
        logService.save(logObject);
    }
}