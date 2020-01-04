var crypto = require('crypto');
var jwt = require('jsonwebtoken');

class Helpers {

    hash(str,hashingSecret) {
        if (typeof (str,hashingSecret) == 'string' && str.length > 0) {
            var hash = crypto.createHmac('sha256', hashingSecret).update(str).digest('hex');
            return hash;
        } else {
            return false;
        }
    };

    validateProductObject(productObject){
        var {name,description,price,category,tags} = productObject;
        if(name && description && price && category && tags) return true;
        else return false;
    }

    validateInquiryObject(inquiryObject){
        var {name,email,phone,message} = inquiryObject;
        if(name && email && phone && message) return true;
        else return false;
    }

    parseProductQueryObject(queryObject){
        var res = {};
        for(var attribute in queryObject){
            try{
                res[attribute] = JSON.parse(queryObject[attribute]);
            }catch(err){
                res[attribute] = queryObject[attribute];
            }
            
        }
        return res;
    }


    createNextPageToken(query,data,jwtPrivateKey){
        if(data.length>0){
            let lastDocId = data[data.length-1]._id;
        console.log(lastDocId);
        return jwt.sign({ query,lastDocId }, jwtPrivateKey);
        }else return false;
        
    }


}













module.exports = new Helpers();