/*
*
* log route | handle all log related requests; usually GET requests
*
*/

const express = require('express');
const Service = require('../../services/log');
var Config = require('../../config');
var Data = require('../../data');
const adminAuthentication = require('../middlewares/adminAuthentication');




module.exports = class Log {
    constructor(container) {
        //create new express route
        this.router = express.Router();
        //get config object from typedi
        this.config = container.get(Config);
        //get data object from typedi
        this.data = container.get(Data);
        //create service instance and add it to typedi's container
        this.service = container.get(Service);
        //get the admin authentication middleware (inject data and config)
        this.adminAuthentication = adminAuthentication(this.data,this.config.jwtPrivateKey);

        //attach the admin authentication middleware
        // this.router.use(this.adminAuthentication);

        //attach auathentication middleware and get handler
        this.router.get('/',this.adminAuthentication, this.get);
        
        
        
    }


    //get handler | read from the inquiries collection
    get = async (req, res)=>{
        // console.log(req.query);
        var query = req.query ? req.query : {};
        //asynchronous call to the inquiry service's get function
        var [data,err] = await this.service.get(query);
        if(data){
            res.send(data);
        }else{
            //@ToDo better status code handling
            res.status = 500;
            res.end(JSON.stringify({err}));
        }
        
    }

    

    

};