/*
*
* token route
*
*/


const express = require('express');
const Service = require('../../services/admin');
const adminAuthentication = require('../middlewares/adminAuthentication');




module.exports = class Admin {
    constructor(container) {
        //create new express route
        this.router = express.Router();
        //get config object from typedi
        this.config = container.get("config");
        //get data object from typedi
        this.data = container.get("data");
        //create service instance and add it to typedi's container
        this.service = container.get(Service);
        //get the admin authentication middleware (inject data and config)
        this.adminAuthentication = adminAuthentication(this.data, this.config.jwtPrivateKey);

        //attach get handler
        this.router.put('/', this.adminAuthentication, this.put);

    }



    //post handler
    put = async (req, res) => {
        if (req.body.newPassword) {
            var [data, err,statusCode] = await this.service.put(req.body.newPassword, req.adminObject);
            res.status(statusCode);
            if (!err) {
                res.end('{"res":"password changed succeffully"}');
            } else {
                
                res.end(JSON.stringify({ err }));
            }
        } else {
            res.status(400);
            res.end(JSON.stringify({err:"missing required fields"}));
        }


    }

};