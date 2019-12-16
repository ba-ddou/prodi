/*
*
*
*
*
*/





const admin = require('./admin');
const product = require('./product');

module.exports = new class Models{
    constructor(){
        this.admin = admin;
        this.product = product;
    }
}