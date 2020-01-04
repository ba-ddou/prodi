/*
*
* admin authentication middelware
*
*
*/

var jwt = require('jsonwebtoken');



//receives parameters and exports a closure
module.exports = (jwtPrivateKey) => {
    return (req, res, next) => {
        console.log('in query middleware');
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