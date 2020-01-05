/*
*
*
*
*/

const express = require('express');
const Token = require('./routes/token');
const Product = require('./routes/product');
const Inquiry = require('./routes/inquiry');
const Log = require('./routes/log');
const Admin = require('./routes/admin');




module.exports = class Api{
    constructor(container){
        
        this.router = express.Router();
        this.token = container.get(Token);
        this.product = container.get(Product);
        this.inquiry = container.get(Inquiry);
        this.log = container.get(Log);
        this.admin = container.get(Admin);

        this.router.use('/token',this.token.router);
        this.router.use('/product',this.product.router);
        this.router.use('/inquiry',this.inquiry.router);
        this.router.use('/log',this.log.router);
        this.router.use('/admin',this.admin.router);
    }
};