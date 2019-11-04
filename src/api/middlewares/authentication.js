/*
*
*
*
*/


module.exports = (req, res, next)=>{
    console.log('request is authentic');
    next()
}