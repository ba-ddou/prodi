/*
*
*
*
*
*/





const admin = require('./admin');

module.exports = new class Models{
    constructor(){
        this.admin = admin;
    }
}