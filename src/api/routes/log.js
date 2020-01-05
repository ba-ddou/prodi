/*
*
* log route | handle all log related requests; usually GET requests
*
*/

const express = require('express');
const Service = require('../../services/log');
const adminAuthentication = require('../middlewares/adminAuthentication');
const query = require('../middlewares/query');



module.exports = class Log {
    constructor(container) {
        //create new express route
        this.router = express.Router();
        //get config object from typedi
        this.config = container.get("config");
        //get data object from typedi
        this.data = container.get("data");
        //create service instance and add it to typedi's container
        this.service = container.get(Service);
        container.set("logService",this.service); 
        //get the admin authentication middleware (inject data and config)
        this.adminAuthentication = adminAuthentication(this.data,this.config.jwtPrivateKey);
        
        //get the query middleware (inject config)
        this.query = query(this.config.jwtPrivateKey);

        //attach the admin authentication middleware
        // this.router.use(this.adminAuthentication);

        //attach auathentication middleware and get handler
        this.router.get('/',this.adminAuthentication,this.query, this.get);
        
        
        
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