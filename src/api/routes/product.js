/*
*
*product route
*
*/

const express = require('express');
const Service = require('../../services/product');
var Config = require('../../config');
var Data = require('../../data');
const adminAuthentication = require('../middlewares/adminAuthentication');




module.exports = class Product {
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

        //attach get handler
        this.router.get('/', this.get);
        //attach auathentication middleware and post handler
        this.router.post('/',this.adminAuthentication,this.post);
    }


    //get handler
    get = async function (req, res) {
        console.log('request reached handler');
        var msg = await service.get();
        console.log('request fulfilled');
        res.send(msg);
    }

    post = async function (req,res) {
        res.send("product saved successfully");
    }

};