/*
*
*
*
*/

var express = require('express');
const Config = require('../config');
var Token = require('./routes/token');
var Product = require('./routes/Product');






module.exports = class Api{
    constructor(container){
        this.config = container.get(Config);
        this.router = express.Router();

        this.token = container.get(Token);
        this.product = container.get(Product);
        this.router.use('/token',this.token.router);
        this.router.use('/product',this.product.router);
    }
};