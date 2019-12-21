/*
*
* adminactivity event listener
* record admin activites in the logs collections
*
*/




module.exports = (data)=>{
    return async (logObject)=>{
        console.log('*************adminactivity event listener****************');
        var err = await data.create('log', logObject);
        if (!err) console.log('log saved successfuly');
        else console.log('log save failed because ',err);
    }
}