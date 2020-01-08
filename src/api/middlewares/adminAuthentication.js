/*
*
* admin authentication middelware
*
*
*/

/*
*
*
* admin authentication middleware
* verify that request to restricted routes contain admin JWTokens
*
*/



var jwt = require('jsonwebtoken');



//a function that receives data object and jwtProvateKey (dependencies) and exports a middleware closure
module.exports = (data, jwtPrivateKey) => {
    return (req, res, next) => {
        // extract header
        var token = req.header('token');
        if (typeof token == 'string' && token.length > 0) {
            // verify and decode token 
            var decoded = jwt.verify(token, jwtPrivateKey);
            if (decoded && decoded._id){
                // passe along the decoded admin object
                req.adminObject = decoded;
                next();
            } 
            else {
                res.status(403);
                res.end('{"Error":"access forbiden"}');
            }
        } else {
            res.status(403);
            res.end('{"Error":"access forbiden"}');
        }
    }
}