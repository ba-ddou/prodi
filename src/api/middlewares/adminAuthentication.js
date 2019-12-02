/*
*
*admin authentication middelware
*
*
*/

var jwt = require('jsonwebtoken');



//receives parameters and exports a closure
module.exports = (data, jwtPrivateKey) => {
    return (req, res, next) => {
        var token = req.header('token');
        if (typeof token == 'string' && token.length > 0) {
            var decoded = jwt.verify(token, jwtPrivateKey);
            if (decoded.role && decoded.role == "Admin") next();
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