/*
*
* product route | handle all product related requests
*
*/

const express = require('express');
const Service = require('../../services/inquiry');
const adminAuthentication = require('../middlewares/adminAuthentication');
const query = require('../middlewares/query');



module.exports = class Inquiry {
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
        this.adminAuthentication = adminAuthentication(this.data,this.config.jwtPrivateKey);

        //get the query middleware (inject config)
        this.query = query(this.config.jwtPrivateKey);

        //attach the admin authentication middleware
        // this.router.use(this.adminAuthentication);

        //attach auathentication middleware, query middleware, and get handler
        this.router.get('/',this.adminAuthentication,this.query,this.get);
        //attach post handler
        this.router.post('/',this.post);
        //attach auathentication middleware and get handler
        this.router.put('/',this.adminAuthentication, this.put);
        
        
    }


    //get handler | read from the inquiries collection
    get = async (req, res)=>{
        var query = req.query ? req.query : {};
        //asynchronous call to the inquiry service's get function
        var [data,err,statusCode] = await this.service.get(query);
        if(data){
            res.send(data);
        }else{
            //@ToDo better status code handling
            res.status = 500;
            res.end(JSON.stringify({err}));
        }
        
    }

    // post handler | save a new incoming inquiry
    post = async (req,res)=>{
        //asynchronous call to the inquiry service's post function
        var [msg,err,statusCode] = await this.service.post(req.body);
        console.log(statusCode);
        res.status(statusCode);
        if(msg){
            res.end(msg);
        }else{
            res.end(JSON.stringify({err}));
        }
    }

    // put handler | update an inquiry's opened property
    put = async (req,res)=>{
        //asynchronous call to the inquiry service's post function
        var [msg,err] = await this.service.put(req.body._id,req.body.opened,req.adminObject);
        if(msg || msg===0){
            res.end(JSON.stringify({response : msg}));
        }else{
            //@ToDo better status code handling
            res.status = 500;
            res.end(JSON.stringify({err}));
        }
    }

    

};