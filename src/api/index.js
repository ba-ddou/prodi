/*
*
*
*
*/

var express = require('express');
const Config = require('../config');
var Token = require('./routes/token');
var Product = require('./routes/product');
var Inquiry = require('./routes/inquiry');
var Log = require('./routes/log');





module.exports = class Api{
    constructor(container){
        this.config = container.get(Config);
        this.router = express.Router();

        this.token = container.get(Token);
        this.product = container.get(Product);
        this.inquiry = container.get(Inquiry);
        this.log = container.get(Log);
        this.router.use('/token',this.token.router);
        this.router.use('/product',this.product.router);
        this.router.use('/inquiry',this.inquiry.router);
        this.router.use('/log',this.log.router);
    }
};