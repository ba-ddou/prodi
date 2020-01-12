/*
*
* product route | handle all product related requests
*
*/

const express = require('express');
const Service = require('../../services/product');
const adminAuthentication = require('../middlewares/adminAuthentication');
const query = require('../middlewares/query');



module.exports = class Product {
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

        //attach get handler
        this.router.get('/',this.query,this.get);
        //attach auathentication middleware and post handler
        this.router.post('/',this.adminAuthentication,this.post);
        //attach auathentication middleware and post handler
        this.router.put('/',this.adminAuthentication,this.put);
        //attach auathentication middleware and post handler
        this.router.delete('/',this.adminAuthentication,this.delete);
    }


    //get handler | read from the products collection
    get = async (req, res)=>{
        // get queryString sobject from request object
        var query = req.query ? req.query : {};
        //asynchronous call to the product service's get function
        var [data,err,statusCode] = await this.service.get(query);
        res.status(statusCode);
        if(data){
            res.send(data);
        }else{
            res.end(JSON.stringify({err}));
        }
        
    }

    // post handler | create a new product
    post = async (req,res)=>{
        //asynchronous call to the product service's post function
        var [_id,err,statusCode] = await this.service.post(req.body,req.adminObject);
        res.status(statusCode);
        if(_id){
            
            res.end(JSON.stringify({_id}));
        }else{
            res.end(JSON.stringify({err}));
        }
    }

    // put handler | update a product document
    put = async (req,res)=>{
        //asynchronous call to the product service's put function
        var [msg,err,statusCode] = await this.service.put(req.body._id,req.body.productObject,req.adminObject);
        res.status(statusCode);
        if(msg || msg===0){
            res.end(JSON.stringify({res:'successfully updated '+msg}));
        }else{
            res.end(JSON.stringify({err}));
        }
    }

    // delete handler | delete a product document
    delete = async (req,res)=>{
        //asynchronous call to the product service's delete function
        var [msg,err,statusCode] = await this.service.delete(req.body._id,req.adminObject);
        res.status(statusCode);
        if(msg || msg===0){
            res.end(JSON.stringify({res:'successfully removed '+msg}));
        }else{
            res.end(JSON.stringify({err}));
        }
    }

};