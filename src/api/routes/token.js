/*
*
* token route
*
*/


const express = require('express');
const Service = require('../../services/token');
var jwt = require('jsonwebtoken');



module.exports = class Token {
    constructor(container) {
        //create new express route
        this.router = express.Router();
        //create service instance and add it to typedi's container
        this.service = container.get(Service);
        //attach get handler
        this.router.get('/',this.get);

        // attach post handler
        this.router.post('/', this.post);
    }

    //get handler
    get = (req, res) => {
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        var token = this.service.get(ip);
        res.end(token);
        
    }

    //post handler | admin login
    post = async (req, res) => {
        // pass the request's body to the service's POST handler
        var [token,err,statusCode] = await this.service.post(req.body);
        res.status(statusCode);
        if(token){
            res.end(JSON.stringify({token}));
        }else{
            res.end(JSON.stringify({err}));
        }
        
    }

};