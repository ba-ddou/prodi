/*
*
*
*
*
*/





const admin = require('./admin');
const product = require('./product');
const inquiry = require('./inquiry');

module.exports = new class Models{
    constructor(){
        this.admin = admin;
        this.product = product;
        this.inquiry = inquiry;
    }
}