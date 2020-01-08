/*
*
* query middleware
* format a nextPageToken into valid a MongoDb conditions (used by get handlers)
*
*/

var jwt = require('jsonwebtoken');



//a function that receives data object and jwtProvateKey (dependencies) and exports a middleware closure
module.exports = (jwtPrivateKey) => {
    return (req, res, next) => {
        // get query object from the request's query strings
        var query = req.query;
        // check for a pagination token
        if (query.nextPageToken) {
            // decode pagination token
            var decoded = jwt.verify(query.nextPageToken, jwtPrivateKey);
            if (decoded && decoded.lastDocId){
                // get query object from pagination token
                let reconstructedQuery = decoded.query;
                // this property tells mongodb to starting reading document starting from the document where the pagination stopped on the last request 
                reconstructedQuery._id = {'$lt':decoded.lastDocId};
                // this is queryObject that's going to used by the data 
                req.query = reconstructedQuery;    
                next();
            } 
            
        } else {
            next();
        }
    }
}