/*
*
*
*
*/

var express = require('express');
var Product = require('./routes/product');
var product = new Product();
const Config = require('../config');





module.exports = class Api{
    constructor(container){
        this.config = container.get(Config);
        console.log("I have access to main config instance; newVar : " +this.config.newVar);
        this.router = express.Router();
        this.router.use('/product',product.router);
    }
};