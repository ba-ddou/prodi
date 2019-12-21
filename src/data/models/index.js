/*
*
*
*
*
*/





const admin = require('./admin');
const product = require('./product');
const inquiry = require('./inquiry');
const log = require('./log');

module.exports = new class Models{
    constructor(){
        this.admin = admin;
        this.product = product;
        this.inquiry = inquiry;
        this.log = log;
    }
}