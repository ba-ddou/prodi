/*
*
* product service
*
*/



var helpers = require('./helpers');
var jwt = require('jsonwebtoken');

module.exports = class Admin {
    constructor(container) {
        //get config object from typedi
        this.config = container.get("config");
        //get data object frm typedi
        this.data = container.get("data");
        // get eventPool object from typedi
        this.eventPool = container.get("eventPool");
    }



    // update admin password function
    // required parameters : 
    //      - username 
    //      - newPassword
    put = async (newPassword, adminObject) => {

        let hashedPassword = helpers.hash(newPassword, this.config.passwordHashingSecret);
        let username = adminObject.username;
        // call the data module's update function
        var [res, err] = await this.data.update('admin', { username }, { hashedPassword });
        if (!err) {
            // dispatch adminactivity event
            this.eventPool.emit('adminactivity', {
                admin: adminObject.username,
                targetCollection: 'admin',
                method: 'put',
            });
            return [res.nModified, err];
        }
        else {
            console.log(err);
            return [res, err];
        }
    }


}