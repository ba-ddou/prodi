var crypto = require('crypto');


class Helpers {

    hash(str,hashingSecret) {
        if (typeof (str,hashingSecret) == 'string' && str.length > 0) {
            var hash = crypto.createHmac('sha256', hashingSecret).update(str).digest('hex');
            return hash;
        } else {
            return false;
        }
    };
}













module.exports = new Helpers();